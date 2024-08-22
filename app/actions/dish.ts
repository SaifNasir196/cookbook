"use server"
import { db } from '@/firebase';
import { Dish } from '@/lib/types'; 
import { addDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, doc, serverTimestamp } from 'firebase/firestore';
import { auth } from '@clerk/nextjs/server';

// Create a new dish
export async function createDish(dish: Omit<Omit<Dish, 'id'>, 'user'>) {
    const { userId } = auth();
    if (!userId) return { error: 'User not authenticated' };

    try {
        const docRef = await addDoc(collection(db, 'dishes'), {
            ...dish,
            user: userId,
            createdAt: serverTimestamp(),
        });
        console.log('print doc', docRef.type);
        return { id: docRef.id };
    } catch (error) {
        console.error('Error adding dish: ', error);
        throw new Error('Failed to create dish');
    }
}

// Read a dish by ID
// export async function getDish(id: string) {
//   try {
//     const docRef = doc(db, 'dishes', id);
//     const docSnap = await getDoc(docRef);
//     if (!docSnap.exists()) {
//       throw new Error('Dish not found');
//     }
//     return { id: docSnap.id, ...docSnap.data() } as Dish;
//   } catch (error) {
//     console.error('Error getting dish: ', error);
//     throw new Error('Failed to get dish');
//   }
// }

// Update a dish
export async function updateDish(id: string, dish: Partial<Omit<Dish, 'id'>>) {
    const { userId } = auth();
    if (!userId) return { error: 'User not authenticated' };
    try {
        const docRef = doc(db, 'dishes', id);
        await updateDoc(docRef, dish);
        return { id, ...dish };
    } catch (error) {
        console.error('Error updating dish: ', error);
        throw new Error('Failed to update dish');
    }
}

// Delete a dish
export async function deleteDish(id: string) {
    const { userId } = auth();
    if (!userId) return { error: 'User not authenticated' };

    try {
        const docRef = doc(db, 'dishes', id);
        await deleteDoc(docRef);
        return { message: 'Dish successfully deleted' };
    } catch (error) {
        console.error('Error deleting dish: ', error);
        throw new Error('Failed to delete dish');
    }
}

// Get all dishes
// export async function getAllDishes() {
//     try {
//         const querySnapshot = await getDocs(collection(db, 'dishes'));
//         return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Dish[];
//     } catch (error) {
//         console.error('Error getting all dishes: ', error);
//         throw new Error('Failed to get all dishes');
//     }
// }