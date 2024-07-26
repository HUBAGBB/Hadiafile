import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

export const shareFile = async (file) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const shareId = Math.random().toString(36).substring(2, 15);
  const shareLink = `${window.location.origin}/share/${shareId}`;

  const sharedFileRef = doc(db, 'sharedFiles', shareId);
  const sharedFileData = {
    ...file,
    shareId,
    originalOwner: user.uid,
    sharedAt: new Date().toISOString()
  };

  await setDoc(sharedFileRef, sharedFileData);

  return { shareId, shareLink };
};