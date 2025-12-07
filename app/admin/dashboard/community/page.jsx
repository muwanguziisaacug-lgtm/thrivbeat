'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  Calendar, 
  MessageSquare, 
  Users, 
  Upload, 
  Trash2, 
  Edit, 
  Plus,
  Video,
  Eye,
  Clock,
  MapPin,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileUploader } from "../../_components/FileUploader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CommunityAdmin = () => {

  function useAuth() {

  }
  const user = { email: 'a@gmail.com'}
  const [activeTab, setActiveTab] = useState("gallery");
  const router = useRouter()
  // Data state
  const [galleryItems, setGalleryItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [discussions] = useState([
    { id: 1, title: "My 6-Month Transformation Journey", author: "Sarah Johnson", replies: 45, likes: 234, status: "active", flagged: false },
    { id: 2, title: "Best Exercises for Lower Back Pain?", author: "Mike Chen", replies: 23, likes: 89, status: "active", flagged: true },
    { id: 3, title: "Nutrition Tips That Actually Work", author: "Emily Rodriguez", replies: 67, likes: 456, status: "active", flagged: false },
  ]);

  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state (simple text inputs — images are provided as URLs)
  const [gCaption, setGCaption] = useState("");
  const [gCategory, setGCategory] = useState("");
  const [gDescription, setGDescription] = useState("");
  const [gImageUrl, setGImageUrl] = useState("");
  const [givideoUrl, setGVideoUrl ]= useState('')

  const [eTitle, setETitle] = useState("");
  const [eDescription, setEDescription] = useState("");
  const [eDate, setEDate] = useState("");
  const [eTime, setETime] = useState("");
  const [eLocation, setELocation] = useState("");
  const [eImageUrl, setEImageUrl] = useState("");

  const [mName, setMName] = useState("");
  const [mBadge, setMBadge] = useState("");
  const [mImageUrl, setMImageUrl] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch('/api/community/data');
      const json = await res.json();
      if (json?.success) {
        setGalleryItems(json.gallery || []);
        setEvents(json.events || []);
        setFeaturedMembers(json.featuredMembers || []);
      }
    } catch (err) {
      console.error('fetchData error', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  async function handleAddGallery(e) {
    e?.preventDefault?.();
    try {
      setLoading(true);
      const res = await fetch('/api/community/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption: gCaption, category: gCategory, description: gDescription, imageUrl: gImageUrl })
      });
      const json = await res.json();
      if (json?.success) {
        toast.message(json?.message)
        setGCaption(''); setGCategory(''); setGDescription(''); setGImageUrl('');
        router.refresh();
        await fetchData();
      } else {
        return toast.error(json.message)
      }
    } catch (err) {
      console.error('handleAddGallery error', err);
    } finally { setLoading(false); }
  }

  async function handleDeleteGallery(id) {
    if (!confirm('Delete this gallery item?')) return;
    try {
      setLoading(true);
      const res = await fetch('/api/community/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json?.success) await fetchData();
    } catch (err) { console.error('deleteGallery error', err); } finally { setLoading(false); }
  }

  async function handleAddEvent(e) {
    e?.preventDefault?.();
    try {
      setLoading(true);
      const res = await fetch('/api/community/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: eTitle, description: eDescription, imageUrl: eImageUrl, date: eDate, time: eTime, location: eLocation })
      });
      const json = await res.json();

      if (json?.success) {
        toast.message(json?.message);
        setETitle(''); setEDescription(''); setEImageUrl(''); setEDate(''); setETime(''); setELocation('');
        await fetchData();
      }
    } catch (err) { console.error('handleAddEvent error', err); } finally { setLoading(false); }
  }

  async function handleDeleteEvent(id) {
    if (!confirm('Delete this event?')) return;
    try {
      setLoading(true);
      const res = await fetch('/api/community/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json?.success) await fetchData();
    } catch (err) { console.error('deleteEvent error', err); } finally { setLoading(false); }
  }

  async function handleAddMember(e) {
    e?.preventDefault?.();
    try {
      setLoading(true);
      const res = await fetch('/api/community/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: mName, badge: mBadge, imageUrl: mImageUrl })
      });
      const json = await res.json();
      console.log(json)

      if (json?.success) {
        toast.message(json?.message)
        setMName(''); setMBadge(''); setMImageUrl('');
        await fetchData();
      }
    } catch (err) { console.error('handleAddMember error', err); } finally { setLoading(false); }
  }

  async function handleDeleteMember(id) {
    if (!confirm('Delete this featured member?')) return;
    try {
      setLoading(true);
      const res = await fetch('/api/community/members', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json?.success) await fetchData();
    } catch (err) { console.error('deleteMember error', err); } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Community Management</h1>
                <p className="text-sm text-muted-foreground">Manage gallery, events, and members</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{galleryItems.length}</p>
                <p className="text-sm text-muted-foreground">Gallery Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{events.length}</p>
                <p className="text-sm text-muted-foreground">Events</p>
              </div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{discussions.length}</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </CardContent>
          </Card> */}
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{featuredMembers.length}</p>
                <p className="text-sm text-muted-foreground">Featured Members</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            {/* <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Discussions
            </TabsTrigger> */}
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Featured Members
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="space-y-6">
              {/* Upload Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Add New Gallery Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FileUploader 
                        type='image'
                        onFileAccepted={(file) =>
                          setGImageUrl(file.key)
                         }
                      
                      />
                    </div>
                    <div className="space-y-4">
                      <form onSubmit={handleAddGallery} className="space-y-4">
                        <div>
                          <Label htmlFor="caption">Caption</Label>
                          <Input id="caption" value={gCaption} onChange={(e) => setGCaption(e.target.value)} placeholder="Enter image caption" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input id="category" value={gCategory} onChange={(e) => setGCategory(e.target.value)} placeholder="e.g., Yoga, Strength, Cardio" />
                        </div>
                        <div>
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Textarea id="description" value={gDescription} onChange={(e) => setGDescription(e.target.value)} placeholder="Add a description..." rows={3} />
                        </div>
                        <div>
                          <Label htmlFor="imageUrl">Image URL</Label>
                          <Input id="imageUrl" value={gImageUrl} onChange={(e) => setGImageUrl(e.target.value)} placeholder="https://..." />
                        </div>
                        <div>
                          <Button type="submit" className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Gallery
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gallery Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Gallery Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group rounded-lg overflow-hidden aspect-square"
                      >
                        <img src={item.imageUrl || item.url} alt={item.caption} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <p className="text-white font-medium text-center px-2">{item.caption}</p>
                          <Badge variant="secondary">{item.category}</Badge>
                          <div className="flex gap-2 mt-2">
                            <Button size="icon" variant="secondary" className="w-8 h-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="destructive" className="w-8 h-8" onClick={() => handleDeleteGallery(item.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Video Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Community Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">Upload community videos or add video links</p>
                      <FileUploader 
                        type='video'
                        onFileAccepted={(file) =>
                          setGVideoUrl(file.key)
                         }
                      
                      />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="space-y-6">
              {/* Create Event Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <form onSubmit={handleAddEvent} className="space-y-4">
                      <div>
                        <Label htmlFor="eventTitle">Event Title</Label>
                        <Input id="eventTitle" value={eTitle} onChange={(e) => setETitle(e.target.value)} placeholder="Enter event title" />
                      </div>
                      <div>
                        <Label htmlFor="eventDescription">Description</Label>
                        <Textarea id="eventDescription" value={eDescription} onChange={(e) => setEDescription(e.target.value)} placeholder="Describe the event..." rows={4} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Date</Label>
                          <Input id="eventDate" type="date" value={eDate} onChange={(e) => setEDate(e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="eventTime">Time</Label>
                          <Input id="eventTime" type="time" value={eTime} onChange={(e) => setETime(e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eventLocation">Location</Label>
                        <Input id="eventLocation" value={eLocation} onChange={(e) => setELocation(e.target.value)} placeholder="Virtual or physical location" />
                      </div>
                      <div>
                        <Label htmlFor="eventImage">Event Image (URL)</Label>
                        <FileUploader 
                        type='image'
                        onFileAccepted={(file) =>
                          setEImageUrl(file.key)
                         }
                      
                      />
                      </div>
                      <div>
                        <Button type="submit" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Event
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>

              {/* Events List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.date} at {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {event.participants} interested
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                          <Button size="icon" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Community Discussions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Topic
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors ${discussion.flagged ? 'border-destructive/50 bg-destructive/5' : ''}`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{discussion.title}</h4>
                          {discussion.flagged && (
                            <Badge variant="destructive" className="text-xs">Flagged</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {discussion.author}</span>
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={discussion.status === "active" ? "default" : "secondary"}>
                          {discussion.status}
                        </Badge>
                        <Button size="icon" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Featured Members Tab */}
          <TabsContent value="members">
            <div className="space-y-6">
              {/* Add Featured Member */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Add Featured Member
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <form onSubmit={handleAddMember} className="md:col-span-3 grid md:grid-cols-3 gap-4 w-full">
                      <div>
                        <Label htmlFor="memberName">Member Name</Label>
                        <Input id="memberName" value={mName} onChange={(e) => setMName(e.target.value)} placeholder="Enter member name" />
                      </div>
                      <div>
                        <Label htmlFor="memberBadge">Badge Title</Label>
                        <Input id="memberBadge" value={mBadge} onChange={(e) => setMBadge(e.target.value)} placeholder="e.g., Top Contributor" />
                      </div>
                      <div>
                      <FileUploader 
                        type='image'
                        onFileAccepted={(file) =>
                          setMImageUrl(file.key)
                         }
                      />
                      </div>
                      <div className="flex items-end">
                        <Button type="submit" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Member
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Members Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Featured Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group text-center"
                      >
                        <div className="relative mb-3 mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                          <img src={member.imageUrl || member.image} alt={member.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="icon" variant="secondary" className="w-8 h-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="destructive" className="w-8 h-8" onClick={() => handleDeleteMember(member.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="font-semibold text-foreground">{member.name}</p>
                        <Badge className="mt-1">{member.badge}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CommunityAdmin;