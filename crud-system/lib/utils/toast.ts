import { toast as sonnerToast } from 'sonner';

export const confirmDelete = (
  message: string,
  onConfirm: () => void
) => {
  sonnerToast(message, {
    duration: 5000,
    position: 'top-center',
    description: 'This cannot be undone',
    action: {
      label: 'Delete',
      onClick: onConfirm
    },
    cancel: {
      label: 'Cancel',
      onClick: () => {}
    },
    actionButtonStyle: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    cancelButtonStyle: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    }
  });
};
