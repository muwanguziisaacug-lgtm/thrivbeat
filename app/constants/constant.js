import {
	HelpCircle,
	Book,
	Video,
	CreditCard,

} from "lucide-react";
export const faqData = [
	{
		category: "Getting Started",
		icon: Book,
		questions: [
			{
				question: "How do I sign up for ThrivBeat?",
				answer: "Simply click 'Subscribe Now' on our homepage, choose your plan, and complete the secure checkout process. You'll receive instant access to your dashboard and can start exercising right away!",
			},
			{
				question: "What equipment do I need?",
				answer: "Most of our exercises require no equipment at all! Some routines may use a sturdy chair, light weights (or water bottles), or a yoga mat. We always provide alternatives for every exercise.",
			},
			{
				question: "How often should I exercise?",
				answer: "We recommend starting with 2-3 sessions per week and gradually increasing as you feel comfortable. Our programs are designed to be gentle and progressive, perfect for building consistency.",
			},
		],
	},
	{
		category: "Video & Technical",
		icon: Video,
		questions: [
			{
				question: "Why won't my videos play?",
				answer: "First, check your internet connection. If the issue persists, try refreshing your browser or clearing your cache. For mobile users, ensure you have the latest app version installed.",
			},
			{
				question: "Can I download videos for offline viewing?",
				answer: "Currently, our videos are streaming-only to ensure you always have access to the latest content and safety updates. However, you can access them anytime with an internet connection.",
			},
			{
				question: "What if the video quality is poor?",
				answer: "Video quality automatically adjusts based on your internet speed. For better quality, ensure you have a stable connection and try closing other applications that might be using bandwidth.",
			},
		],
	},
	{
		category: "Health & Safety",
		icon: HelpCircle,
		questions: [
			{
				question: "Are these exercises safe for my condition?",
				answer: "Our exercises are specifically designed for mature adults with chronic conditions. However, we always recommend consulting with your healthcare provider before starting any new exercise program, especially if you have specific health concerns.",
			},
			{
				question: "What if I feel pain during exercise?",
				answer: "Stop immediately if you feel any pain. Our motto is 'listen to your body.' Every exercise includes modifications, and you should never push through pain. When in doubt, consult your healthcare provider.",
			},
			{
				question: "Can I modify the exercises?",
				answer: "Absolutely! Every routine includes multiple modification options. Our instructors demonstrate seated alternatives, reduced intensity versions, and adaptations for different mobility levels.",
			},
		],
	},
	{
		category: "Billing & Account",
		icon: CreditCard,
		questions: [
			{
				question: "How do I cancel my subscription?",
				answer: "You can cancel anytime from your account settings or by contacting our support team. Your access will continue until the end of your current billing period.",
			},
			{
				question: "What payment methods do you accept?",
				answer: "We accept all major credit cards and PayPal. All payments are processed securely through encrypted connections.",
			},
			{
				question: "Can I get a refund?",
				answer: "We offer a 7-day free trial, and if you're not satisfied within the first 30 days, we'll provide a full refund. Contact our support team to process your refund request.",
			},
		],
	},
];
