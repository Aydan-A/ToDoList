import React, { useState } from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);

    const openPlanner = () => {
        setIsPlannerOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isPlannerOpen) {
        return (
            <div className="app-shell">
                <div className="app-glow app-glow-left" />
                <div className="app-glow app-glow-right" />
                <div className="app-glow app-glow-center" />

                <main className="planner-page">
                    <header className="planner-header">
                        <div>
                            <p className="eyebrow">Your workspace</p>
                            <h1>Welcome back to your planner</h1>
                            <p className="planner-copy">
                                Capture what matters, clean up noise, and keep moving with a calmer daily flow.
                            </p>
                        </div>

                        <button className="secondary-button" onClick={() => setIsPlannerOpen(false)}>
                            Back to welcome
                        </button>
                    </header>

                    <section className="planner-stage">
                        <TodoList />
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="app-shell">
            <div className="app-glow app-glow-left" />
            <div className="app-glow app-glow-right" />
            <div className="app-glow app-glow-center" />

            <main className="landing-page">
                <section className="hero-panel reference-layout">
                    <div className="hero-copy reference-copy">
                        <div className="hero-badge">
                            <span className="hero-badge-icon">✦</span>
                            <span>Your productivity companion</span>
                        </div>

                        <h1>ToDo App</h1>
                        <p className="hero-text">
                            Turn your to-dos into ta-das. Stay focused, motivated, and in control with a playful task
                            manager that keeps your day moving.
                        </p>

                        <div className="benefit-list">
                            <div className="benefit-item">
                                <span className="benefit-icon benefit-icon-mint">✓</span>
                                <span>Simple and intuitive interface</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon benefit-icon-gold">⚡</span>
                                <span>Boost your productivity instantly</span>
                            </div>
                        </div>

                        <div className="hero-actions">
                            <button className="primary-button" onClick={openPlanner}>
                                Start Organizing
                                <span className="button-arrow">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="hero-preview reference-preview">
                        <div className="floating-sticker sticker-star">✨</div>
                        <div className="floating-sticker sticker-heart">💜</div>

                        <div className="preview-stage">
                            <div className="mascot-cloud" />
                            <div className="mascot-body">
                                <div className="mascot-cat">🐱</div>
                            </div>
                        </div>

                        <div className="task-preview-list" id="welcome-features">
                            <div className="task-preview-card task-preview-lilac">
                                <span className="task-dot task-dot-purple" />
                                <span className="task-label">Morning meditation</span>
                                <span className="task-chip task-chip-purple">Today</span>
                            </div>

                            <div className="task-preview-card task-preview-green is-complete">
                                <span className="task-dot task-dot-green">✓</span>
                                <span className="task-label">Feed the cat</span>
                                <span className="task-chip task-chip-green">Done</span>
                            </div>

                            <div className="task-preview-card task-preview-pink">
                                <span className="task-dot task-dot-pink" />
                                <span className="task-label">Plan weekend getaway</span>
                                <span className="task-chip task-chip-pink">Soon</span>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default App; 
