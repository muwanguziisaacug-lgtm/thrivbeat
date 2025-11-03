import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

const Support = () => {
	const support = [
        {
            userId: 1,
			user: "Isaac Dev",
			email: "muwanguzi@gmail.com",
			subject: "Trouble logging In",
			message:
				"Hey there am having trouble logging in what is happening i need to pay before the 2days elapse or otherwise i will not have anything left",
		},
	];

	// here we shall display messages sent through support form like the subject, email,  message i wil need also to notify the admin via email or whatsapp if new support request is availabe
	//
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">
						See what issues are customers facing
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ul >
						{support.map((s) => (
							<li key={s.userId} className="space-y-3 bg-background/80 p-4 rounded-md">
								<div className="flex items-center gap-3">
                                    <div className="w-[70px] h-[70px] bg-red-500 rounded-full"></div>
                                    
									<span className="flex flex-col gap-1">
                                        <span className="text-xl font-medium">{s.user}</span>
                                        <span className="text-muted-foreground">{s.email }</span>
									</span>
								</div>
								<div className="flex flex-col gap-3">
									<span className="text-xl font-medium">
										{s.subject}
									</span>
									<span className="text-muted-foreground">{s.message}</span>
								</div>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
};

export default Support;
