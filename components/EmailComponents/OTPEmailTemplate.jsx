// Removed next/image for server compatibility
import React from "react";

const EmailTemplate = ({ otp }) => {
	return (
		<div
			style={{ width: "100%", background: "#f9f9f9", padding: "40px 0" }}
		>
			<div
				style={{
					maxWidth: 600,
					margin: "0 auto",
					background: "#fff",
					borderRadius: 8,
					boxShadow: "0 2px 8px #eee",
					padding: 32,
					fontFamily: "Arial, sans-serif",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: 24 }}>
					<h2
						style={{
							fontSize: 28,
							fontWeight: 700,
							margin: 0,
							color: "#222",
						}}
					>
						CourseBang
					</h2>
				</div>
				<div>
					<p
						style={{
							fontSize: 20,
							fontWeight: 600,
							margin: "24px 0 8px 0",
							color: "#222",
						}}
					>
						Hi there,
					</p>
					<p
						style={{
							fontSize: 16,
							margin: "0 0 24px 0",
							color: "#444",
						}}
					>
						To continue signing in, please use the code below. This
						one-time code helps verify your identity and keeps your
						account secure. It expires in 10 minutes.
					</p>
					<p
						style={{
							background: "#f1f5ff",
							color: "#1a237e",
							fontWeight: 700,
							fontSize: 24,
							textAlign: "center",
							padding: 16,
							borderRadius: 6,
							letterSpacing: 2,
							margin: "24px 0",
						}}
					>
						{otp}
					</p>
					<p
						style={{
							fontSize: 15,
							color: "#444",
							margin: "24px 0 0 0",
						}}
					>
						Need help? You can always reach us at
						<a
							href="https://www.coursebang.com/support"
							style={{
								color: "#1a73e8",
								textDecoration: "underline",
								marginLeft: 6,
							}}
							target="_blank"
							rel="noopener noreferrer"
						>
							Click here
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailTemplate;
