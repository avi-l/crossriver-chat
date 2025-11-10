import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Camera } from 'lucide-react';
import { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useUserStore } from '../state/userStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const user = accounts[0];

  const {
    avatar: storedAvatar,
    displayName: storedName,
    setAvatar,
    setDisplayName,
  } = useUserStore();

  // Local state to edit before saving
  const [localAvatar, setLocalAvatar] = useState<string | null>(storedAvatar);
  const [localName, setLocalName] = useState(
    storedName || user?.name || user?.username || ''
  );
  const [email] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLocalAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      // Update Zustand only when saving
      setAvatar(localAvatar);
      setDisplayName(localName);

      setLoading(false);
      // change this to a toast notification
      toast.success('Profile saved!');
      // Optionally persist to backend here
    }, 500);
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-background text-foreground p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl'>Profile</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col space-y-6'>
          <ScrollArea className='max-h-[60vh]'>
            <div className='flex flex-col space-y-4'>
              {/* Avatar */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4'>
                <label className='w-32 font-semibold text-sm'>Avatar:</label>
                <div className='flex items-center space-x-4'>
                  <div className='w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center'>
                    {localAvatar ? (
                      <img
                        src={localAvatar}
                        alt='Avatar'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <span className='text-muted-foreground text-xl'>
                        {localName?.[0] || '?'}
                      </span>
                    )}
                  </div>
                  <label className='cursor-pointer'>
                    <input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleAvatarChange}
                    />
                    <Button
                      asChild
                      variant='outline'
                      className='flex items-center gap-2'
                    >
                      <span>
                        <Camera className='w-4 h-4' />
                        Upload
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {/* Display Name */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4'>
                <label className='w-32 font-semibold text-sm'>
                  Display Name:
                </label>
                <Input
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  placeholder='Your display name'
                />
              </div>

              {/* Email */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4'>
                <label className='w-32 font-semibold text-sm'>Email:</label>
                <Input value={email} disabled />
              </div>
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              disabled={loading}
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
