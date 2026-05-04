import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useReturnReasons } from '../../hooks/useReturnReasons'
import { Loader2, AlertCircle } from 'lucide-react'

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  isSubmitting: boolean
  type: 'CANCEL' | 'RETURN'
}

export function OrderActionModal({ isOpen, onClose, onConfirm, isSubmitting, type }: ActionModalProps) {
  const { data: reasons, isLoading } = useReturnReasons(type)
  const [selectedReason, setSelectedReason] = useState<string>('')

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="p-8 pb-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-black tracking-tight">
              {type === 'CANCEL' ? 'Cancel Order' : 'Request Return'}
            </DialogTitle>
            <DialogDescription className="text-neutral-500 font-medium pt-1">
              Please select a reason for your {type.toLowerCase()} request.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-8 py-4 max-h-[300px] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="animate-spin text-neutral-300" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Loading options...</p>
            </div>
          ) : reasons && reasons.length > 0 ? (
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-3">
              {reasons.map((r) => (
                <div
                  key={r.id}
                  className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedReason === r.reason 
                      ? 'bg-neutral-50 border-black shadow-sm' 
                      : 'border-neutral-100 hover:border-neutral-200'
                  }`}
                  onClick={() => setSelectedReason(r.reason)}
                >
                  <RadioGroupItem value={r.reason} id={r.id} className="text-black" />
                  <Label htmlFor={r.id} className="font-bold text-[14px] cursor-pointer flex-1">
                    {r.reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <AlertCircle className="text-neutral-200" size={40} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">No options available</p>
            </div>
          )}
        </div>

        <div className="p-8 pt-4 bg-neutral-50 flex flex-col gap-3">
          <Button
            onClick={handleConfirm}
            disabled={!selectedReason || isSubmitting}
            variant="black"
            className="w-full h-12 rounded-xl text-[13px] font-black uppercase tracking-widest shadow-lg shadow-black/5"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : (
              `Confirm ${type === 'CANCEL' ? 'Cancellation' : 'Return'}`
            )}
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl text-[13px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-all"
          >
            Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
