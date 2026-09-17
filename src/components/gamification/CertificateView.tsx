"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Certificate, useGame } from "@/components/gamification";
import { useAuth } from "@/lib/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { MasterCertificate } from "@/components/gamification/MasterCertificate";
import { formatCertificateDate } from "@/lib/gamification/certificate";
import { certificates, MASTER_CERTIFICATE_ID } from "@/lib/gamification/config";

/** Renders one earned certificate, or a friendly locked message. */
type StoredCertificate = {
  certificate_number: string | null;
  issued_at: string | null;
};

export function CertificateView() {
  const params = useParams<{ certificateId: string }>();
  const { player, level, isLoaded } = useGame();
  const { user } = useAuth();
  const [storedMasterCertificate, setStoredMasterCertificate] =
    useState<StoredCertificate | null>(null);

  const certificate = certificates.find(
    (item) => item.id === params.certificateId,
  );

  const isMaster = certificate?.id === MASTER_CERTIFICATE_ID;

  // The emailed download link can be opened on a new device: look up the
  // member's saved final certificate after sign-in, not only local game state.
  useEffect(() => {
    if (!isMaster || !user) return;

    void (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      const response = await fetch("/api/certificates/master", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const payload = (await response.json().catch(() => ({}))) as {
        certificate?: StoredCertificate | null;
      };
      if (response.ok && payload.certificate) {
        setStoredMasterCertificate(payload.certificate);
      }
    })();
  }, [isMaster, user?.id]);

  if (!certificate) {
    return <LockedMessage message="We couldn't find that certificate." />;
  }

  if (!isLoaded) {
    return <div className="py-16" />;
  }

  const isEarned =
    player.certificateIds.includes(certificate.id) ||
    (isMaster && Boolean(storedMasterCertificate));

  if (!isEarned) {
    return (
      <LockedMessage
        message={
          isMaster
            ? "🔒 Complete all 15 worlds to unlock your certificate."
            : `This certificate is still locked. ${certificate.subtitle} to unlock it.`
        }
      />
    );
  }

  const award =
    player.certificateAwards[certificate.id] ||
    (storedMasterCertificate
      ? {
          certificateNumber:
            storedMasterCertificate.certificate_number ?? "IP2KIDS-MASTER",
          awardedAt: storedMasterCertificate.issued_at ?? new Date().toISOString(),
        }
      : null);
  if (!award) {
    return (
      <Container className="py-16 text-center">
        <p className="font-display text-xl font-bold text-detective-blue-900">
          Generating your official certificate…
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-16">
      <Link
        href="/dashboard"
        className="mb-8 inline-flex items-center gap-2 font-display font-semibold text-detective-blue-700 transition-colors hover:text-detective-orange-500 print:hidden"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to my dashboard
      </Link>

      {isMaster ? (
        <MasterCertificate
          studentName={player.name}
          completionDate={formatCertificateDate(award.awardedAt)}
          certificateId={award.certificateNumber}
        />
      ) : (
        <Certificate
          certificate={certificate}
          studentName={player.name}
          levelTitle={level.current.title}
          xpEarned={player.xp}
          certificateNumber={award.certificateNumber}
          awardedOn={formatCertificateDate(award.awardedAt)}
        />
      )}
    </Container>
  );
}

function LockedMessage({ message }: { message: string }) {
  return (
    <Container className="py-16 text-center">
      <span
        aria-hidden="true"
        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-detective-blue-100"
      >
        <Lock className="h-8 w-8 text-detective-blue-700" />
      </span>
      <p className="mt-6 font-display text-2xl font-bold text-detective-blue-900">
        {message}
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-semibold text-white"
      >
        Back to my dashboard
      </Link>
    </Container>
  );
}
