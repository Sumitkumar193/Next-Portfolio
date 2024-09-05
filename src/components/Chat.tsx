"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 w-48">
            <Card className={`shadow-lg transition-all duration-300 ${isOpen ? 'h-64' : 'h-10'}`}>
                <CardHeader className="flex flex-row items-center p-[1.2rem] h-2 justify-between cursor-pointer" onClick={toggleChat}>
                    <span className="font-bold">Chat</span>
                    <Button variant="ghost" size="sm">
                        {isOpen ? '▼' : '▲'}
                    </Button>
                </CardHeader>
                <hr />
                {isOpen && (
                    <CardDescription className="h-48 overflow-auto p-2">
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 1
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 2
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 3
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 4
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 1
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 2
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 3
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 4
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 1
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 2
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 3
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                            <div className="flex items-center justify-between mb-1 p-1">
                                Friend 4
                                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                            </div>
                    </CardDescription>
                )}
            </Card>
        </div>
    );
};

export default Chat;