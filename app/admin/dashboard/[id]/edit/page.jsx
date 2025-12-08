'use client'
import { getExercise, updateExercise } from "@/app/admin/lib/exercise-actions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, UploadCloud, X } from "lucide-react";
import { FileUploader } from "@/app/admin/_components/FileUploader";

const EditExercise = () => {
    const { id } = useParams();
	const [exercise, setExercise] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [category, setCategory] = useState("cardio");
    const [plan, setPlan] = useState("FREE");
    const [duration, setDuration] = useState("");
    const [calories, setCalories] = useState("");
    const [equipments, setEquipments] = useState([]);
    const [steps, setSteps] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [thumbnailKey, setThumbnailKey] = useState("");
    const [videoKey, setVideoKey] = useState("");
    const [loading, setLoading] = useState(false);
    
  	const addSteps = () => setSteps([...steps, ""]);
	const updateSteps = (index, value) => {
		const updated = [...steps];
		updated[index] = value;
		setSteps(updated);
	};
	const removeSteps = (index) => {
		setSteps(steps.filter((_, i) => i !== index));
	};
	const addEquipments = () => setEquipments([...equipments, ""]);
	const updateEquip = (index, value) => {
		const updated = [...equipments];
		updated[index] = value;
		setEquipments(updated);
	};
	const removeEquip = (index) => {
		setEquipments(equipments.filter((_, i) => i !== index));
	};

	const addBenefits = () => setBenefits([...benefits, ""]);
	const updateBenfits = (index, value) => {
		const updated = [...benefits];
		updated[index] = value;
		setBenefits(updated);
	};
	const removeBenefit = (index) => {
		setBenefits(benefits.filter((_, i) => i !== index));
    };
    

    useEffect(() => {
        setLoading(true);
        const loadExercise = async () => {
            try {
                const response = await getExercise(id);
                if (!response.success) {
                    toast.error(response.message);
                    return;
                }
                const data = response.exercise;
                setExercise(data);
                setTitle(data.title || "");
                setDescription(data.description || "");
                setLevel(data.level || "Beginner");
                setCategory(data.category || "cardio");
                setPlan(data.plan || "FREE");
                setDuration(data.duration ? String(data.duration) : "");
                setCalories(data.calories ? String(data.calories) : "");
                setEquipments(Array.isArray(data.equipments) ? data.equipments : []);
                setSteps(Array.isArray(data.steps) ? data.steps : []);
                setBenefits(Array.isArray(data.benefits) ? data.benefits : []);
                setThumbnailKey(data.thumbnailKey || "");
                setVideoKey(data.videoKey || "");
            } catch (err) {
                toast.error("Internal Server Error");
            } finally {
                setLoading(false);
            }
        };
        loadExercise();
    }, [id]);
    // Update handler
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateExercise({
                id,
                title,
                description,
                thumbnailKey,
                videoKey,
                duration,
                level,
                category,
                calories,
                plan,
                status: "Draft",
                equipments,
                steps,
                benefits,
            });
            if (res.success) {
                toast.success("Exercise updated successfully!");
            } else {
                toast.error(res.message || "Failed to update exercise");
            }
        } catch (err) {
            toast.error(err.message || "Failed to update exercise");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create Exercise</CardTitle>
                    <CardDescription>
                        Craft your exercise Into Engaging Fun Base
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdate}>
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        <Label>Exercise Title</Label>
                                        <Input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Running Vs Walking which is the best for you"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder="Running Vs Walking which is the best for you"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="grid gap-2">
                                            <Label>Difficulty</Label>
                                            <Select
                                                value={level}
                                                onValueChange={setLevel}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Beginner" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Beginner">
                                                            Beginner
                                                        </SelectItem>
                                                        <SelectItem value="Intermediate">
                                                            Intermediate
                                                        </SelectItem>
                                                        <SelectItem value="Advanced">
                                                            Advanced
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Category</Label>
                                            <Select
                                                value={category}
                                                onValueChange={setCategory}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Cardio Exercise" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="flexibility">
                                                            Flexibility
                                                        </SelectItem>
                                                        <SelectItem value="cardio">
                                                            Cardio
                                                        </SelectItem>
                                                        <SelectItem value="balance">
                                                            Balance
                                                        </SelectItem>
                                                        <SelectItem value="endurance">
                                                            Endurance
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Plan</Label>
                                            <Select
                                                value={plan}
                                                onValueChange={setPlan}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Free" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="FREE">
                                                            Free
                                                        </SelectItem>
                                                        <SelectItem value="PREMIUM">
                                                            Premium
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Duration</Label>
                                            <Input
                                                type="number"
                                                value={duration}
                                                onChange={(e) =>
                                                    setDuration(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Calories Burned</Label>
                                            <Input
                                                type="number"
                                                value={calories}
                                                onChange={(e) =>
                                                    setCalories(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Steps */}
                                    <div className="space-y-3">
                                        <Label>Steps to Follow</Label>
                                        {steps.map((step, index) => (
                                            <div key={index} className="flex gap-3">
                                                <Input
                                                    value={step}
                                                    onChange={(e) =>
                                                        updateSteps(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Step ${index + 1}`}
                                                />
                                                <Button
                                                    onClick={() => removeSteps(index)}
                                                    size="icon"
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="size-6" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            onClick={addSteps}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Plus size="icon" />
                                            Add Step
                                        </Button>
                                    </div>
        
                                    {/* Benefits */}
                                    <div className="space-y-3">
                                        <Label>Benefits from the Exercise</Label>
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="flex gap-3">
                                                <Input
                                                    value={benefit}
                                                    onChange={(e) =>
                                                        updateBenfits(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Benfit ${index + 1}`}
                                                />
                                                <Button
                                                    onClick={() => removeBenefit(index)}
                                                    size="icon"
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="size-6" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            onClick={addBenefits}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Plus size="icon" />
                                            Add benefit
                                        </Button>
                                    </div>
                                    
                                    {/* Equipments */}
                                    <div className="space-y-3">
                                        <Label>Equipments Needed</Label>
                                        {equipments.map((equip, index) => (
                                            <div key={index} className="flex gap-3">
                                                <Input
                                                    value={equip}
                                                    onChange={(e) =>
                                                        updateEquip(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Equipment ${index + 1}`}
                                                />
                                                <Button
                                                    onClick={() => removeEquip(index)}
                                                    size="icon"
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="size-6" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            onClick={addEquipments}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Plus size="icon" />
                                            Add Equipment
                                        </Button>
                                    </div>
        
                                    <div>
                                        <Label>Thumbnail</Label>
                                        <FileUploader
                                            FileType="image"
                                            onFileAccepted={(file) =>
                                                setThumbnailKey(file.key)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Video Upload</Label>
                                        <FileUploader
                                            FileType="video"
                                            onFileAccepted={(file) =>
                                                setVideoKey(file.key)
                                            }
                                        />
                                    </div>
                                    {/* <div className="grid gap-3">
                                        <Label>Video Upload</Label>
                                        <div className="w-full h-40 border-gray-500 border-2 border-dashed rounded-md grid place-content-center">
                                            <UploadCloud className="size-10" />
                                        </div>
                                    </div> */}
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <Button
                                        className=""
                                        variant="outline"
                                        type="button"
                                        disabled={loading}
                                    >
                                        Save As Draft
                                    </Button>
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Updating..." : "Update Exercise"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        {/* <CardFooter className='gap-4'>
                            <CardAction className="w-full">
                                <Button className="w-full" variant='outline'>Save As Draft</Button>
                            </CardAction>
                            <CardAction className="w-full">
                                <Button className="w-full" type='submit'>Create Exercise</Button>
                            </CardAction>
                        </CardFooter> */}
                    </Card>
                </div>
    );
};

export default EditExercise;
