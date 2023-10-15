'use client';

import React, { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";

enum InterviewStatus {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
    Completed = 'completed'
}

interface Candidate {
    id: number;
    name: string;
    rating: 1 | 2 | 3 | 4 | 5;
    status: InterviewStatus;
    feedback?: string;
}

const InterviewPanel: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([
        { id: 1, name: 'Amit', rating: 4, status: InterviewStatus.Pending },
        { id: 2, name: 'Akansha', rating: 5, status: InterviewStatus.Approved, feedback: 'Good' },
        { id: 3, name: 'Rohan', rating: 3, status: InterviewStatus.Completed, feedback: 'Average. Need to practice conceptually' },
        { id: 4, name: 'Smruti', rating: 2, status: InterviewStatus.Rejected, feedback: 'Not good' }
    ]);

    const [newCandidate, setNewCandidate] = useState<Candidate>({
        id: candidates.length + 1,
        name: '',
        rating: 1,
        status: InterviewStatus.Pending,
        feedback: ''
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const addCandidate = (): void => {
        if (!newCandidate.name) {
            toast.error('Please enter a name');
            return;
        }

        if (isEditing) {
            const updatedCandidates = candidates.map((candidate) => candidate.id === newCandidate.id ? newCandidate : candidate);
            setCandidates(updatedCandidates);
            setIsEditing(false);
            toast.success('Candidate updated successfully');
            setNewCandidate({
                id: candidates.length + 1,
                name: '',
                rating: 1,
                status: InterviewStatus.Pending,
                feedback: '',
            });
        } else {
            setCandidates([...candidates, newCandidate]);
            setNewCandidate({
                id: candidates.length + 1,
                name: '',
                rating: 1,
                status: InterviewStatus.Pending,
                feedback: '',
            });
        }
    }

    const handleStatusChange = (id: number, status: InterviewStatus) => {
        const updatedCandidates = candidates.map((candidate) => candidate.id === id ? { ...candidate, status } : candidate);
        setCandidates(updatedCandidates);
    };

    const deleteCandidate = (id: number) => {
        const updatedList = candidates.filter(candidate => candidate.id !== id)
        setCandidates(updatedList)
    }

    const editCandidatePer = (candidate: Candidate) => {
        setIsEditing(true);
        setNewCandidate(candidate);
    }

    return (
        <main className='flex justify-center items-center'>
            <div className="p-4 text-center">
                <h1 className="text-2xl font-semibold my-8">Candidate Tracker</h1>
                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border rounded"
                        value={newCandidate.name}
                        onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Rating"
                        className="p-2 border rounded"
                        min={1}
                        max={5}
                        value={newCandidate.rating}
                        onChange={(e) => setNewCandidate({ ...newCandidate, rating: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                    />
                    <select
                        value={newCandidate.status}
                        onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value as InterviewStatus })}
                        className="p-2 border rounded"
                    >
                        {Object.values(InterviewStatus).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Feedback"
                        className="p-2 border rounded"
                        value={newCandidate.feedback}
                        onChange={(e) => setNewCandidate({ ...newCandidate, feedback: e.target.value })}
                    />
                    <button onClick={addCandidate} className="bg-blue-500 text-white p-2 rounded ml-2">
                        Add Candidate
                    </button>
                </div>
                <table className="w-full table-auto">
                    <thead className='bg-slate-200 rounded-md'>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Rating</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Feedback</th>
                            <th className='px-4 py-2'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id} className="bg-gray-100">
                                <td className="px-4 py-2">{candidate.name}</td>
                                <td className="px-4 py-2">{candidate.rating}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={candidate.status}
                                        onChange={(e) => handleStatusChange(candidate.id, e.target.value as InterviewStatus)}
                                        className="p-2 border rounded"
                                    >
                                        {Object.values(InterviewStatus).map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-2 flex justify-between">
                                    <p className="text-left">
                                        {candidate.feedback ? candidate.feedback : 'No feedback'}
                                    </p>
                                </td>
                                <td className='px-4 py-2'>
                                    <div className='flex justify-end'>
                                        {(candidate.status === InterviewStatus.Approved || candidate.status === InterviewStatus.Completed || candidate.status === InterviewStatus.Rejected) && (
                                            <button
                                                className="bg-blue-500 text-white p-2 rounded ml-2"
                                                onClick={() => editCandidatePer(candidate)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button onClick={() => deleteCandidate(candidate.id)} className='bg-red-500 text-white p-2 rounded ml-2'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </main>
    )
}

export default InterviewPanel;