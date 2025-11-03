import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowDownCircle } from "lucide-react";
import React from "react";

const ScheduleCall = () => {
	return (
		<div className="">
			<Card className='w-4/5 mx-auto mt-10'>
				<CardHeader className='space-y-3'>
					<CardTitle className='text-center text-2xl font-bold '  >We Are Here To Help</CardTitle>
					<CardDescription className='text-center'>
						Feel free to contact Us whenever you want
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action="" className="w-full">
						<div className="flex flex-col gap-8 ">
							<div className="grid gap-3">
								<Label>Full Name</Label>
								<Input placeholder="John Doe" />
							</div>
							<div className="grid gap-3">
								<Label>Email</Label>
								<Input placeholder="John Doe" type="email" />
							</div>

							<div className="flex gap-10">
								<div className="grid gap-3">
									<Label>Preferred Communication</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Zoom Meeting" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="google-meet">
													Google Meet
												</SelectItem>
												<SelectItem value="zoom-meet">
													Zoom Meeting
												</SelectItem>
												<SelectItem value="facebook-chat">
													FaceBook Chat
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								<div className="grid gap-3">
									<Label>Set Time</Label>
									<Input type="time" className="" />
								</div>

								<div className="grid gap-3">
									<Label>Set Date</Label>
									<Input type="date" className="" />
								</div>
							</div>
                        </div>
                        
                        <Button className='mt-10 w-full bg-red-600 text-white font-medium'>
                            Schedule Call
                        </Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ScheduleCall;
