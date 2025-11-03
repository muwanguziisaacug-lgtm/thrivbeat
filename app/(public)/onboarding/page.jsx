// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { Progress } from "@/components/ui/progress";
// import {
// 	ChevronRight,
// 	ChevronLeft,
// 	User,
// 	Globe,
// 	BookOpen,
// 	Target,
// 	Check,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const countries = [
// 	{ code: "KES", symbol: "KSh", name: "Kenyan Shilling", country: "Kenya" },
// 	{ code: "UGX", symbol: "UGX", name: "Ugandan Shilling", country: "Uganda" },
// 	{
// 		code: "TZS",
// 		symbol: "TSh",
// 		name: "Tanzanian Shilling",
// 		country: "Tanzania",
// 	},
// 	{ code: "RWF", symbol: "FRw", name: "Rwandan Franc", country: "Rwanda" },
// 	{ code: "ZMW", symbol: "ZK", name: "Zambian Kwacha", country: "Zambia" },
// 	{ code: "EUR", symbol: "€", name: "Euro", country: "European Union" },
// 	//   { code: 'US', name: 'United States', currency: 'USD' },
// 	//   { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
// 	//   { code: 'EU', name: 'European Union', currency: 'EUR' },
// 	//   { code: 'CA', name: 'Canada', currency: 'CAD' },
// 	//   { code: 'AU', name: 'Australia', currency: 'AUD' },
// 	//   { code: 'IN', name: 'India', currency: 'INR' },
// 	//   { code: 'JP', name: 'Japan', currency: 'JPY' },
// 	//   { code: 'CN', name: 'China', currency: 'CNY' },
// 	//   { code: 'BR', name: 'Brazil', currency: 'BRL' },
// 	//   { code: 'MX', name: 'Mexico', currency: 'MXN' },
// ];

// const currencies = [
// 	{
// 		code: "KES",
// 		symbol: "KSh",
// 		name: "Kenyan Shilling",
// 		country: "Kenya",
// 	},
// 	{
// 		code: "UGX",
// 		symbol: "UGX",
// 		name: "Ugandan Shilling",
// 		country: "Uganda",
// 	},
// 	{
// 		code: "TZS",
// 		symbol: "TSh",
// 		name: "Tanzanian Shilling",
// 		country: "Tanzania",
// 	},
// 	{
// 		code: "RWF",
// 		symbol: "FRw",
// 		name: "Rwandan Franc",
// 		country: "Rwanda",
// 	},
// 	{
// 		code: "ZMW",
// 		symbol: "ZK",
// 		name: "Zambian Kwacha",
// 		country: "Zambia",
// 	},

// 	//   { code: 'USD', symbol: '$', name: 'US Dollar' },
// 	//   { code: 'EUR', symbol: '€', name: 'Euro' },
// 	//   { code: 'GBP', symbol: '£', name: 'British Pound' },
// 	//   { code: 'KES', symbol: '¥', name: 'Kenyan Shillings' },
// 	//   { code: '', symbol: 'C$', name: 'Canadian Dollar' },
// 	//   { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
// 	//   { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
// 	//   { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
// 	//   { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
// 	//   { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
// ];

// const learningGoals = [
// 	"Career advancement",
// 	"Learn new skills",
// 	"Personal development",
// 	"Start a new career",
// 	"Hobby & interests",
// 	"Academic purposes",
// 	"Entrepreneurship",
// 	"Freelancing opportunities",
// 	"Improve productivity",
// 	"Develop leadership skills",
// 	"Enhance creativity",
// 	"Certification & qualifications",
// 	"Networking & collaboration",
// 	"Language learning",
// 	"Tech & digital skills",
// 	"Health & wellness knowledge",
// 	"Financial literacy",
// 	"Art & design skills",
// 	"Music & performing arts",
// 	"Travel & cultural exploration",
// 	"Prepare for exams",
// 	"Improve communication skills",
// 	"Mentorship & coaching",
// 	"Software development",
// 	"Project management",
// 	"Marketing & branding",
// 	"Public speaking",
// 	"Personal finance management",
// 	"Emotional intelligence",
// 	"Time management",
// ];

// const experienceLevels = [
// 	{ value: "beginner", label: "Beginner", description: "Just starting out" },
// 	{
// 		value: "intermediate",
// 		label: "Intermediate",
// 		description: "Some experience",
// 	},
// 	{
// 		value: "advanced",
// 		label: "Advanced",
// 		description: "Experienced learner",
// 	},
// ];

// export default function Onboarding() {
// 	const navigate = useRouter();
// 	const [currentStep, setCurrentStep] = useState(1);
// 	const totalSteps = 5;

// 	const [formData, setFormData] = useState({
// 		// Step 1: Basic Info
// 		firstName: "",
// 		lastName: "",
// 		displayName: "",

// 		// Step 2: Contact & Location
// 		email: "",
// 		phone: "",
// 		country: "",
// 		currency: "",
// 		timezone: "",

// 		// Step 3: Learning Preferences
// 		learningGoals: [],
// 		experienceLevel: "",
// 		preferredLanguage: "English",

// 		// Step 4: Interests
// 		interests: [],
// 		timeCommitment: "",
// 		preferredSchedule: "",

// 		// Step 5: Personalization
// 		bio: "",
// 		profilePicture: "",
// 		notifications: true,
// 	});

// 	const updateFormData = (field, value) => {
// 		setFormData((prev) => ({ ...prev, [field]: value }));
// 	};

// 	const handleNext = () => {
// 		if (currentStep < totalSteps) {
// 			setCurrentStep(currentStep + 1);
// 		}
// 	};

// 	const handlePrevious = () => {
// 		if (currentStep > 1) {
// 			setCurrentStep(currentStep - 1);
// 		}
// 	};

// 	const handleComplete = () => {
// 		// Save onboarding data
// 		console.log("Onboarding complete:", formData);
// 		navigate.push("/");
// 	};

// 	const handleSkip = () => {
// 		navigate.push("/");
// 	};

// 	const renderStep = () => {
// 		switch (currentStep) {
// 			case 1:
// 				return (
// 					<motion.div
// 						initial={{ opacity: 0, x: 20 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						exit={{ opacity: 0, x: -20 }}
// 						className="space-y-6"
// 					>
// 						<div className="text-center mb-8">
// 							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// 								<User className="w-8 h-8 text-primary" />
// 							</div>
// 							<h2 className="text-2xl font-bold text-foreground">
// 								Welcome! Let's get to know you
// 							</h2>
// 							<p className="text-muted-foreground mt-2">
// 								The names will be displayed on Certificates
// 							</p>
// 						</div>

// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 							<div className="space-y-2">
// 								<Label htmlFor="firstName">First Name</Label>
// 								<Input
// 									id="firstName"
// 									placeholder="John"
// 									value={formData.firstName}
// 									onChange={(e) =>
// 										updateFormData(
// 											"firstName",
// 											e.target.value
// 										)
// 									}
// 								/>
// 							</div>
// 							<div className="space-y-2">
// 								<Label htmlFor="lastName">Last Name</Label>
// 								<Input
// 									id="lastName"
// 									placeholder="Doe"
// 									value={formData.lastName}
// 									onChange={(e) =>
// 										updateFormData(
// 											"lastName",
// 											e.target.value
// 										)
// 									}
// 								/>
// 							</div>
// 						</div>

// 						<div className="space-y-2">
// 							<Label htmlFor="displayName">
// 								Display Name (Optional)
// 							</Label>
// 							<Input
// 								id="displayName"
// 								placeholder="How would you like to be called?"
// 								value={formData.displayName}
// 								onChange={(e) =>
// 									updateFormData(
// 										"displayName",
// 										e.target.value
// 									)
// 								}
// 							/>
// 							<p className="text-sm text-muted-foreground">
// 								This is how other learners will see you
// 							</p>
// 						</div>
// 					</motion.div>
// 				);

// 			case 2:
// 				return (
// 					<motion.div
// 						initial={{ opacity: 0, x: 20 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						exit={{ opacity: 0, x: -20 }}
// 						className="space-y-6"
// 					>
// 						<div className="text-center mb-8">
// 							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// 								<Globe className="w-8 h-8 text-primary" />
// 							</div>
// 							<h2 className="text-2xl font-bold text-foreground">
// 								Contact & Location
// 							</h2>
// 							<p className="text-muted-foreground mt-2">
// 								Help us connect with you better
// 							</p>
// 						</div>

// 						<div className="space-y-4">
// 							<div className="space-y-2">
// 								<Label htmlFor="email">Email Address</Label>
// 								<Input
// 									id="email"
// 									type="email"
// 									placeholder="john@example.com"
// 									value={formData.email}
// 									onChange={(e) =>
// 										updateFormData("email", e.target.value)
// 									}
// 								/>
// 							</div>

// 							<div className="space-y-2">
// 								<Label htmlFor="phone">
// 									Phone Number (Optional)
// 								</Label>
// 								<Input
// 									id="phone"
// 									type="tel"
// 									placeholder="+1 (555) 000-0000"
// 									value={formData.phone}
// 									onChange={(e) =>
// 										updateFormData("phone", e.target.value)
// 									}
// 								/>
// 							</div>

// 							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 								<div className="space-y-2">
// 									<Label htmlFor="country">Country</Label>
// 									<Select
// 										value={formData.country}
// 										onValueChange={(value) => {
// 											updateFormData("country", value);
// 											const country = countries.find(
// 												(c) => c.code === value
// 											);
// 											if (country) {
// 												updateFormData(
// 													"currency",
// 													country.currency
// 												);
// 											}
// 										}}
// 									>
// 										<SelectTrigger>
// 											<SelectValue placeholder="Select your country" />
// 										</SelectTrigger>
// 										<SelectContent>
// 											{countries.map((country) => (
// 												<SelectItem
// 													key={country.code}
// 													value={country.code}
// 												>
// 													{country.name}
// 												</SelectItem>
// 											))}
// 										</SelectContent>
// 									</Select>
// 								</div>

// 								<div className="space-y-2">
// 									<Label htmlFor="currency">
// 										Preferred Currency
// 									</Label>
// 									<Select
// 										value={formData.currency}
// 										onValueChange={(value) =>
// 											updateFormData("currency", value)
// 										}
// 									>
// 										<SelectTrigger>
// 											<SelectValue placeholder="Select currency" />
// 										</SelectTrigger>
// 										<SelectContent>
// 											{currencies.map((currency) => (
// 												<SelectItem
// 													key={currency.code}
// 													value={currency.code}
// 												>
// 													{currency.symbol}{" "}
// 													{currency.name}
// 												</SelectItem>
// 											))}
// 										</SelectContent>
// 									</Select>
// 								</div>
// 							</div>
// 						</div>
// 					</motion.div>
// 				);

// 			case 3:
// 				return (
// 					<motion.div
// 						initial={{ opacity: 0, x: 20 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						exit={{ opacity: 0, x: -20 }}
// 						className="space-y-6"
// 					>
// 						<div className="text-center mb-8">
// 							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// 								<Target className="w-8 h-8 text-primary" />
// 							</div>
// 							<h2 className="text-2xl font-bold text-foreground">
// 								Learning Goals
// 							</h2>
// 							<p className="text-muted-foreground mt-2">
// 								What brings you here today?
// 							</p>
// 						</div>

// 						<div className="space-y-4">
// 							<div className="space-y-2">
// 								<Label>
// 									What are your main learning goals?
// 								</Label>
// 								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// 									{learningGoals.map((goal) => (
// 										<div
// 											key={goal}
// 											onClick={() => {
// 												const goals =
// 													formData.learningGoals.includes(
// 														goal
// 													)
// 														? formData.learningGoals.filter(
// 																(g) =>
// 																	g !== goal
// 															)
// 														: [
// 																...formData.learningGoals,
// 																goal,
// 															];
// 												updateFormData(
// 													"learningGoals",
// 													goals
// 												);
// 											}}
// 											className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
// 												formData.learningGoals.includes(
// 													goal
// 												)
// 													? "border-primary bg-primary/5"
// 													: "border-border hover:border-primary/50"
// 											}`}
// 										>
// 											<div className="flex items-center justify-between">
// 												<span className="text-sm font-medium">
// 													{goal}
// 												</span>
// 												{formData.learningGoals.includes(
// 													goal
// 												) && (
// 													<Check className="w-4 h-4 text-primary" />
// 												)}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>

// 							<div className="space-y-2">
// 								<Label>What's your experience level?</Label>
// 								<RadioGroup
// 									value={formData.experienceLevel}
// 									onValueChange={(value) =>
// 										updateFormData("experienceLevel", value)
// 									}
// 								>
// 									{experienceLevels.map((level) => (
// 										<div
// 											key={level.value}
// 											className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/5"
// 										>
// 											<RadioGroupItem
// 												value={level.value}
// 												id={level.value}
// 												className="mt-1"
// 											/>
// 											<div className="flex-1">
// 												<Label
// 													htmlFor={level.value}
// 													className="font-medium cursor-pointer"
// 												>
// 													{level.label}
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													{level.description}
// 												</p>
// 											</div>
// 										</div>
// 									))}
// 								</RadioGroup>
// 							</div>
// 						</div>
// 					</motion.div>
// 				);

// 			case 4:
// 				return (
// 					<motion.div
// 						initial={{ opacity: 0, x: 20 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						exit={{ opacity: 0, x: -20 }}
// 						className="space-y-6"
// 					>
// 						<div className="text-center mb-8">
// 							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// 								<BookOpen className="w-8 h-8 text-primary" />
// 							</div>
// 							<h2 className="text-2xl font-bold text-foreground">
// 								Learning Preferences
// 							</h2>
// 							<p className="text-muted-foreground mt-2">
// 								Help us recommend the best courses for you
// 							</p>
// 						</div>

// 						<div className="space-y-4">
// 							<div className="space-y-2">
// 								<Label htmlFor="interests">
// 									What topics interest you?
// 								</Label>
// 								<Textarea
// 									id="interests"
// 									placeholder="e.g., Web development, Data science, Photography, Business..."
// 									value={formData.interests.join(", ")}
// 									onChange={(e) =>
// 										updateFormData(
// 											"interests",
// 											e.target.value
// 												.split(",")
// 												.map((s) => s.trim())
// 										)
// 									}
// 									rows={3}
// 								/>
// 							</div>

// 							<div className="space-y-2">
// 								<Label>
// 									How much time can you dedicate to learning?
// 								</Label>
// 								<RadioGroup
// 									value={formData.timeCommitment}
// 									onValueChange={(value) =>
// 										updateFormData("timeCommitment", value)
// 									}
// 								>
// 									<div className="flex items-center space-x-2">
// 										<RadioGroupItem
// 											value="casual"
// 											id="casual"
// 										/>
// 										<Label htmlFor="casual">
// 											Casual (1-3 hours/week)
// 										</Label>
// 									</div>
// 									<div className="flex items-center space-x-2">
// 										<RadioGroupItem
// 											value="regular"
// 											id="regular"
// 										/>
// 										<Label htmlFor="regular">
// 											Regular (3-10 hours/week)
// 										</Label>
// 									</div>
// 									<div className="flex items-center space-x-2">
// 										<RadioGroupItem
// 											value="intensive"
// 											id="intensive"
// 										/>
// 										<Label htmlFor="intensive">
// 											Intensive (10+ hours/week)
// 										</Label>
// 									</div>
// 								</RadioGroup>
// 							</div>

// 							<div className="space-y-2">
// 								<Label>Preferred learning schedule</Label>
// 								<Select
// 									value={formData.preferredSchedule}
// 									onValueChange={(value) =>
// 										updateFormData(
// 											"preferredSchedule",
// 											value
// 										)
// 									}
// 								>
// 									<SelectTrigger>
// 										<SelectValue placeholder="When do you prefer to learn?" />
// 									</SelectTrigger>
// 									<SelectContent>
// 										<SelectItem value="morning">
// 											Morning (6am - 12pm)
// 										</SelectItem>
// 										<SelectItem value="afternoon">
// 											Afternoon (12pm - 6pm)
// 										</SelectItem>
// 										<SelectItem value="evening">
// 											Evening (6pm - 12am)
// 										</SelectItem>
// 										<SelectItem value="flexible">
// 											Flexible
// 										</SelectItem>
// 									</SelectContent>
// 								</Select>
// 							</div>
// 						</div>
// 					</motion.div>
// 				);

// 			case 5:
// 				return (
// 					<motion.div
// 						initial={{ opacity: 0, x: 20 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						exit={{ opacity: 0, x: -20 }}
// 						className="space-y-6"
// 					>
// 						<div className="text-center mb-8">
// 							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// 								<Check className="w-8 h-8 text-primary" />
// 							</div>
// 							<h2 className="text-2xl font-bold text-foreground">
// 								Almost done!
// 							</h2>
// 							<p className="text-muted-foreground mt-2">
// 								Add a personal touch to your profile
// 							</p>
// 						</div>

// 						<div className="space-y-4">
// 							<div className="space-y-2">
// 								<Label htmlFor="bio">
// 									Tell us about yourself (Optional)
// 								</Label>
// 								<Textarea
// 									id="bio"
// 									placeholder="Share a bit about your background, interests, or what motivates you to learn..."
// 									value={formData.bio}
// 									onChange={(e) =>
// 										updateFormData("bio", e.target.value)
// 									}
// 									rows={4}
// 								/>
// 							</div>

// 							<div className="space-y-2">
// 								<Label>Email notifications</Label>
// 								<div className="flex items-center space-x-2 p-3 rounded-lg border">
// 									<input
// 										type="checkbox"
// 										id="notifications"
// 										checked={formData.notifications}
// 										onChange={(e) =>
// 											updateFormData(
// 												"notifications",
// 												e.target.checked
// 											)
// 										}
// 										className="w-4 h-4 text-primary"
// 									/>
// 									<Label
// 										htmlFor="notifications"
// 										className="flex-1 cursor-pointer"
// 									>
// 										Keep me updated about new courses and
// 										learning opportunities
// 									</Label>
// 								</div>
// 							</div>
// 						</div>

// 						<div className="bg-primary/5 rounded-lg p-4 mt-6">
// 							<p className="text-sm text-center text-muted-foreground">
// 								You can always update these preferences in your
// 								account settings
// 							</p>
// 						</div>
// 					</motion.div>
// 				);

// 			default:
// 				return null;
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen bg-background">
// 			<div className="container max-w-2xl mx-auto px-4 py-8">
// 				{/* Progress Bar */}
// 				<div className="mb-8">
// 					<div className="flex justify-between items-center mb-4">
// 						<h1 className="text-lg font-semibold text-foreground">
// 							Getting Started
// 						</h1>
// 						<button
// 							onClick={handleSkip}
// 							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
// 						>
// 							Skip for now
// 						</button>
// 					</div>
// 					<Progress
// 						value={(currentStep / totalSteps) * 100}
// 						className="h-2"
// 					/>
// 					<p className="text-sm text-muted-foreground mt-2">
// 						Step {currentStep} of {totalSteps}
// 					</p>
// 				</div>

// 				{/* Form Content */}
// 				<div className="bg-card rounded-lg shadow-sm border p-6 md:p-8">
// 					<AnimatePresence mode="wait">
// 						{renderStep()}
// 					</AnimatePresence>

// 					{/* Navigation Buttons */}
// 					<div className="flex justify-between mt-8">
// 						<Button
// 							variant="outline"
// 							onClick={handlePrevious}
// 							disabled={currentStep === 1}
// 							className="flex items-center gap-2"
// 						>
// 							<ChevronLeft className="w-4 h-4" />
// 							Previous
// 						</Button>

// 						{currentStep === totalSteps ? (
// 							<Button
// 								onClick={handleComplete}
// 								className="flex items-center gap-2"
// 							>
// 								Complete Setup
// 								<Check className="w-4 h-4" />
// 							</Button>
// 						) : (
// 							<Button
// 								onClick={handleNext}
// 								className="flex items-center gap-2"
// 							>
// 								Next
// 								<ChevronRight className="w-4 h-4" />
// 							</Button>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
