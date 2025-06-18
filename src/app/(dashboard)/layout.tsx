import React from 'react'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h2>Welcome to movie recommenadation site</h2>
                <div className='w-full'>{
                    children}
                </div>
            
        </div>
    );
}

