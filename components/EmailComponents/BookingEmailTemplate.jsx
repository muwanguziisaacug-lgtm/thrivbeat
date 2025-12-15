import React from "react";

const BookingEmailTemplate = ({ name, email, phone, serviceType, groupSize, preferredDate, location, message }) => {
    const serviceName = serviceType === "chair-classes" ? "Chair-Based Classes (£5/person)" : "Event Booking (£35-£70)";
    
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
                        📅 New Booking Request
                    </h2>
                    <p style={{ margin: "6px 0", color: "#666", fontSize: 14 }}>
                        A customer has submitted a booking request — please review.
                    </p>
                </div>

                {/* Booking Details */}
                <div style={{ marginTop: 24 }}>
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Service Type:</strong> {serviceName}
                    </p>
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Name:</strong> {name}
                    </p>
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Email:</strong> {email}
                    </p>
                    {phone && (
                        <p style={{ margin: "8px 0", fontSize: 16 }}>
                            <strong>Phone:</strong> {phone}
                        </p>
                    )}
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Group Size:</strong> {groupSize}
                    </p>
                    {preferredDate && (
                        <p style={{ margin: "8px 0", fontSize: 16 }}>
                            <strong>Preferred Date:</strong> {preferredDate}
                        </p>
                    )}
                    <p style={{ margin: "8px 0", fontSize: 16 }}>
                        <strong>Location:</strong> {location}
                    </p>

                    {message && (
                        <div
                            style={{
                                background: "#f7f9ff",
                                padding: 18,
                                borderRadius: 6,
                                marginTop: 16,
                                borderLeft: "4px solid #4CAF50",
                            }}
                        >
                            <p style={{ margin: 0, fontSize: 14, color: "#222", fontWeight: 600, marginBottom: 8 }}>
                                Additional Details:
                            </p>
                            <p style={{ margin: 0, fontSize: 14, color: "#555", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                                {message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{ marginTop: 32, borderTop: "1px solid #eee", paddingTop: 24, textAlign: "center" }}>
                    <p style={{ margin: "8px 0", fontSize: 12, color: "#999" }}>
                        This is an automated email from ThrivBeat booking system.
                    </p>
                    <p style={{ margin: "4px 0", fontSize: 12, color: "#999" }}>
                        © 2025 ThrivBeat. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingEmailTemplate;
