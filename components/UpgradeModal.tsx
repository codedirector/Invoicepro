"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function UpgradeModal({ open, onClose }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade Required</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          You’ve reached the limit of your free plan.
          Upgrade to unlock more clients and invoices.
        </p>

        <Button className="bg-[#FFD84D] text-black hover:bg-[#F4C430]">
          Upgrade Plan
        </Button>
      </DialogContent>
    </Dialog>
  )
}
