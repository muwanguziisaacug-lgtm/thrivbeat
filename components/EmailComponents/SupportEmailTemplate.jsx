// No next/image to ensure email/server compatibility
import React from "react";

const SupportEmailTemplate = ({ name, email, subject, message }) => {
    return (
        <div style={{ width: "100%", background: "#f9f9f9", padding: "40px 0" }}>
            <div
                style={{
                    maxWidth: 600,
                    margin: "0 auto",
                    background: "#ffffff",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    padding: 32,
                    fontFamily: "Arial, sans-serif",
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <h2
                        style={{
                            fontSize: 26,
                            fontWeight: 700,
                            margin: 0,
                            color: "#222",
                        }}
                    >
                        📩 New Support Request
                    </h2>
                    <p style={{ margin: "6px 0", color: "#666", fontSize: 14 }}>
                        A user has submitted a support ticket — please review.
                    </p>
                </div>

                {/* Ticket Details */}
                <div style={{ marginTop: 24 }}>
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Name:</strong> {name}
                    </p>
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Email:</strong> {email}
                    </p>
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Subject:</strong> {subject}
                    </p>

                    <div
                        style={{
                            background: "#f7f9ff",
                            padding: 18,
                            borderRadius: 6,
                            margin: "18px 0",
                            borderLeft: "4px solid #1a73e8",
                            fontSize: 15,
                            color: "#333",
                            lineHeight: "22px",
                            whiteSpace: "pre-line"
                        }}
                    >
                        {message}
                    </div>

                    <p style={{ fontSize: 14, color: "#555", marginTop: 10 }}>
                        Please follow up with the user at:{" "}
                        <a href={`mailto:${email}`} style={{ color: "#1a73e8" }}>
                            {email}
                        </a>
                    </p>
                </div>

                {/* Footer */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: 30,
                        fontSize: 12,
                        color: "#888",
                    }}
                >
                    This email was automatically sent from the support form.
                </p>
            </div>
        </div>
    );
};

export default SupportEmailTemplate;
