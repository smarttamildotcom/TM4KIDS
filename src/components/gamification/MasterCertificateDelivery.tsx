"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { MASTER_CERTIFICATE_ID, TOTAL_WORLDS } from "@/lib/gamification/config";
import { formatCertificateDate } from "@/lib/gamification/certificate";
import { useGame } from "@/lib/gamification/GameProvider";
import { downloadMasterCertificatePdf } from "@/lib/gamification/master-certificate-pdf";
import { supabase } from "@/lib/supabase";

/**
 * Delivers the Master Certificate from the shared player state, so it works
 * whether World 15 is finished on the journey map or in its lesson route.
 */
export function MasterCertificateDelivery() {
  const { player, isLoaded: gameLoaded } = useGame();
  const { user, isLoaded: authLoaded } = useAuth();
  const delivering = useRef(false);

  useEffect(() => {
    const award = player.certificateAwards[MASTER_CERTIFICATE_ID];
    const hasFinishedWorldFifteen = player.completedWorldIds.includes(TOTAL_WORLDS);

    if (
      !gameLoaded ||
      !authLoaded ||
      !user ||
      !award ||
      !hasFinishedWorldFifteen ||
      delivering.current
    ) {
      return;
    }

    const deliveryKey = `brandquest:master-certificate-delivered:${user.id}:${award.certificateNumber}`;
    if (window.localStorage.getItem(deliveryKey)) return;

    delivering.current = true;

    void (async () => {
      try {
        // Save the award and send the member's future-download link first.
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("No active member session for certificate delivery.");
        }

        const response = await fetch("/api/certificates/master", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ certificateNumber: award.certificateNumber }),
        });

        if (!response.ok) {
          throw new Error("The certificate could not be saved or emailed.");
        }

        // Then provide the immediate PDF download in the member's browser.
        await downloadMasterCertificatePdf({
          studentName: user.studentName || player.name,
          completionDate: formatCertificateDate(award.awardedAt),
          certificateId: award.certificateNumber,
        });

        window.localStorage.setItem(deliveryKey, "true");
      } catch (error) {
        // Keep the marker unset so the delivery is retried safely on the next visit.
        console.error("[certificate] Master certificate delivery failed", error);
      } finally {
        delivering.current = false;
      }
    })();
  }, [
    authLoaded,
    gameLoaded,
    player.certificateAwards,
    player.completedWorldIds,
    player.name,
    user,
  ]);

  return null;
}
