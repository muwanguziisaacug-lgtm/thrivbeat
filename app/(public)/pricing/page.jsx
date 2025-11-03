
'use client'
import { useState } from "react";
import { Check, Heart, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";


const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    
    const router = useRouter()

  const plans = [
		{
			name: "Free",
			description: "Free tier with limited access",
			monthlyPrice: 0,
			annualPrice: 0,
			savings: 0,
			icon: Heart,
			color: "gray",
			features: [
				"Access to 10+ exercise videos",
				"Chair-based routines",
				"Basic progress tracking",
				"Community support",
				"Mobile and web access"
			]
		},
    {
      name: "Premium",
      description: "Most popular - comprehensive fitness support",
      monthlyPrice: 15,
      annualPrice: 150,
      savings: 30,
      icon: Star,
      color: "red",
      popular: true,
      features: [
        "Access to 50+ exercise videos",
        "All Basic features included",
        "Condition-specific programs",
        "Nutrition guidance videos",
        "Progress photos upload",
        "Priority email support",
        "Downloadable workout guides"
      ]
    },
    // {
    //   name: "Premium",
    //   description: "Complete wellness solution with personal support",
    //   monthlyPrice: 79,
    //   annualPrice: 790,
    //   savings: 160,
    //   icon: Crown,
    //   color: "black",
    //   features: [
    //     "Access to 75+ exercise videos",
    //     "All Standard features included",
    //     "Monthly group video calls",
    //     "Personal progress reviews",
    //     "Custom exercise modifications", 
    //     "Direct messaging with trainers",
    //     "Meal planning resources",
    //     "Family member access (2 accounts)"
    //   ]
    // }
  ];

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12);
  };

		const handleSubscribe = async (planName) => {
			try {
				const period = billingCycle === 'monthly' ? 'MONTHLY' : 'YEARLY'

				// Check auth status first
				const statusRes = await fetch('/api/auth/status');
				const status = await statusRes.json();
				if (!statusRes.ok || !status.authenticated) {
					// Redirect to login preserving where the user was going and desired plan/period
					const nextUrl = encodeURIComponent(`/pricing?plan=${planName.toUpperCase()}&period=${period}`);
					router.push(`/login?next=${nextUrl}`);
					return;
				}

				const res = await fetch('/api/checkout', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ plan: planName.toUpperCase(), period }),
				})

				const data = await res.json()

				if (res.ok && data.url) {
					// redirect user to Stripe Checkout
					window.location.href = data.url
				} else {
					console.error('Checkout session creation failed', data)
					alert(data.error ? `${data.error}${data.details ? ' - ' + data.details : ''}` : 'Failed to create checkout session. Please try again.')
				}
			} catch (err) {
				console.error(err)
				alert('An unexpected error occurred. Please try again.')
			}
		};

  return (
		<div className="min-h-screen bg-background">
			<div className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-5xl font-bold  mb-6">
							Choose Your Fitness Journey
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
							Select the plan that fits your needs and start your
							path to better health today. All plans include our
							safe, expert-guided exercise programs.
						</p>

						{/* Billing Toggle */}
						<div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm border">
							<button
								className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
									billingCycle === "monthly"
										? "bg-red-600 text-white"
										: "text-gray-700 hover:text-gray-800"
								}`}
								onClick={() => setBillingCycle("monthly")}
							>
								Monthly
							</button>
							<button
								className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
									billingCycle === "annual"
										? "bg-red-600 text-white"
										: "text-gray-700 hover:"
								}`}
								onClick={() => setBillingCycle("annual")}
							>
								Annual
								<span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
									Save up to 20%
								</span>
							</button>
						</div>
					</div>

					{/* Plans Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{plans.map((plan, index) => (
							<Card
								key={plan.name}
								className={`relative ${
									plan.popular
										? "border-red-500 shadow-xl scale-105"
										: "border-gray-200 shadow-lg hover:shadow-xl"
								} transition-all duration-300`}
							>
								{plan.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
											Most Popular
										</span>
									</div>
								)}

								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
											plan.color === "red"
												? "bg-red-100"
												: plan.color === "black"
													? "bg-gray-100"
													: "bg-gray-100"
										}`}
									>
										<plan.icon
											className={`w-8 h-8 ${
												plan.color === "red"
													? "text-red-600"
													: plan.color === "black"
														? "text-gray-800"
														: "text-muted-foreground"
											}`}
										/>
									</div>

									<CardTitle className="text-2xl font-bold ">
										{plan.name}
									</CardTitle>

									<p className="text-muted-foreground mt-2">
										{plan.description}
									</p>

									<div className="mt-6">
										<div className="flex items-baseline justify-center">
											<span className="text-4xl font-bold ">
												${getPrice(plan)}
											</span>
											<span className="text-muted-foreground ml-2">
												/month
											</span>
										</div>

										{billingCycle === "annual" && (
											<div className="mt-2">
												<span className="text-sm text-gray-500 line-through">
													${plan.monthlyPrice}/month
												</span>
												<span className="text-sm text-green-600 ml-2 font-semibold">
													Save ${plan.savings}/year
												</span>
											</div>
										)}
									</div>
								</CardHeader>

								<CardContent className="pt-0">
									<ul className="space-y-3 mb-8">
										{plan.features.map(
											(feature, featureIndex) => (
												<li
													key={featureIndex}
													className="flex items-start"
												>
													<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
													<span className="text-gray-700">
														{feature}
													</span>
												</li>
											)
										)}
									</ul>

									<Button
										className={`w-full py-3 text-lg font-semibold ${
											plan.popular
												? "bg-red-600 hover:bg-red-700 text-white"
												: "bg-gray-900 hover:bg-gray-800 text-white"
										}`}
										onClick={() =>
											handleSubscribe(plan.name)
										}
									>
										Get Started
									</Button>

									<p className="text-center text-sm text-gray-500 mt-4">
										7-day free trial • Cancel anytime
									</p>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Comparison Table */}
					<div className="mt-20">
						<h2 className="text-3xl font-bold text-center  mb-12">
							Compare All Features
						</h2>

						<div className="bg-background rounded-lg shadow-xl overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-background">
										<tr>
											<th className="px-6 py-4 text-left text-sm font-semibold ">
												Features
											</th>
											{plans.map((plan) => (
												<th
													key={plan.name}
													className="px-6 py-4 text-center text-sm font-semibold "
												>
													{plan.name}
												</th>
											))}
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 dark:divide-gray-800">
										<tr>
											<td className="px-6 py-4 text-sm ">
												Exercise Videos
											</td>
											<td className="px-6 py-4 text-center text-sm text-gray-700">
													10+
												</td>
											<td className="px-6 py-4 text-center text-sm text-gray-700">
												50+
											</td>
											<td className="px-6 py-4 text-center text-sm text-gray-700">
												75+
											</td>
										</tr>
										<tr className="bg-background">
											<td className="px-6 py-4 text-sm ">
												Progress Tracking
											</td>
											<td className="px-6 py-4 text-center">
												<Check className="w-5 h-5 text-green-500 mx-auto" />
											</td>
											<td className="px-6 py-4 text-center">
												<Check className="w-5 h-5 text-green-500 mx-auto" />
											</td>
											<td className="px-6 py-4 text-center">
												<Check className="w-5 h-5 text-green-500 mx-auto" />
											</td>
										</tr>
										<tr>
											<td className="px-6 py-4 text-sm ">
												Email Support
											</td>
											<td className="px-6 py-4 text-center">
												<Check className="w-5 h-5 text-green-500 mx-auto" />
											</td>
											<td className="px-6 py-4 text-center text-sm text-gray-700">
												Priority
											</td>
											<td className="px-6 py-4 text-center text-sm text-gray-700">
												Priority
											</td>
										</tr>
										<tr className="bg-background">
											<td className="px-6 py-4 text-sm ">
												Group Video Calls
											</td>
											<td className="px-6 py-4 text-center text-gray-400">
												-
											</td>
											<td className="px-6 py-4 text-center text-gray-400">
												-
											</td>
											<td className="px-6 py-4 text-center">
												<Check className="w-5 h-5 text-green-500 mx-auto" />
											</td>
										</tr>
										<tr>
											<td className="px-6 py-4 text-sm ">
												Personal Trainer Access
											</td>
											<td className="px-6 py-4 text-center text-gray-400">
												-
											</td>
											<td className="px-6 py-4 text-center text-gray-400">
												-
											</td>
											<td className="px-6 py-4 text-center">
												<Check className="w-5 h-5 text-green-500 mx-auto" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					{/* FAQ Section */}
					<div className="mt-20 text-center">
						<h2 className="text-2xl font-bold  mb-8">
							Frequently Asked Questions
						</h2>
						<div className="max-w-3xl mx-auto space-y-6 text-left">
							<div className="bg-background  rounded-lg p-6 shadow-lg shadow-gray-800">
								<h3 className="font-semibold  mb-2">
									Is there a free trial?
								</h3>
								<p className="text-muted-foreground">
									Yes! All plans include a 7-day free trial.
									You can cancel anytime during the trial
									period without being charged.
								</p>
							</div>
							<div className="bg-background  rounded-lg p-6 shadow-sm shadow-gray-800">
								<h3 className="font-semibold  mb-2">
									Are the exercises safe for my condition?
								</h3>
								<p className="text-muted-foreground">
									Our exercises are designed specifically for
									mature adults with chronic conditions.
									However, we always recommend consulting with
									your healthcare provider before starting any
									new exercise program.
								</p>
							</div>
							<div className="bg-background  rounded-lg p-6 shadow-sm shadow-gray-800">
								<h3 className="font-semibold  mb-2">
									Can I switch plans later?
								</h3>
								<p className="text-muted-foreground">
									Absolutely! You can upgrade or downgrade
									your plan at any time. Changes will take
									effect at your next billing cycle.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
};

export default Pricing;