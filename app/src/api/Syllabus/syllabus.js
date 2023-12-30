import { collection, doc, getDocs, getDoc, query, where, collectionGroup } from 'firebase/firestore';
import { db } from "../../config/firebase";

export const fetchSyllabus = async (className) => {
    try {
        // Use collectionGroup to query across all subjectId subcollections
        const querySnapshot = await getDocs(collectionGroup(db, className));

        const syllabusData = {};

        querySnapshot.forEach((doc) => {
            const subjectId = doc.id;

            // Include the document data in the result
            syllabusData[subjectId] = {
                docId: doc.id,
                ...doc.data(),
            };
        });

        return syllabusData;
    } catch (error) {
        console.error('Error fetching syllabus', error);
        return { status: false, message: 'An error occurred while fetching syllabus' };
    }
};

