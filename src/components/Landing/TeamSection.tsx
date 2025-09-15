// components/TeamSection.tsx
import React from 'react';
import Navigation from './Navigation';

interface TeamMember {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    imageAlt: string;
}

const TeamSection: React.FC = () => {
    const teamMembers: TeamMember[] = [
        {
            id: '1',
            name: 'Ayushman Gupta',
            position: 'Founder & CEO',
            imageUrl: '/founder.png',
            imageAlt: 'Profile picture of Ayushman Gupta'
        },
        {
            id: '2',
            name: 'Garima Goyal',
            position: 'Co-Founder',
            imageUrl: '/gg.png',
            imageAlt: 'Profile picture of Garima Goyal'
        },
    ];

    return (
        <>
            <Navigation />
            <section className="bg-black flex items-center justify-center min-h-screen py-12 px-4">
                <div className="bg-white/10 rounded-xl shadow-2xl w-full max-w-5xl p-8 sm:p-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">
                        Meet Our Team
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="flex items-center space-x-6 p-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-28 h-28 object-cover rounded-full filter"
                                        src={member.imageUrl}
                                        alt={member.imageAlt}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">{member.position}</p>
                                    <h2 className="text-xl font-bold text-white mt-1">{member.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamSection;