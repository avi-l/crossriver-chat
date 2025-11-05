import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog';
import { Trash2 } from 'lucide-react';

import { AlertDialogHeader } from './ui/alert-dialog';
import { Button } from './ui/button';
import { useChatStore } from '@/state/chatStore';

export const ClearChatButton = () => {
  const { clearMessages } = useChatStore();
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='flex items-center gap-1'
          >
            <Trash2 className='w-4 h-4' />
            Clear
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all messages and the AI will forget the
              conversation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='flex justify-end gap-2 mt-4'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearMessages}>
              Confirm
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
