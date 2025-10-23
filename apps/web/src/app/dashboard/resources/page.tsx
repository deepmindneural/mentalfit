'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  BookOpen, 
  Play,
  Headphones,
  FileText,
  Video,
  Download,
  Search,
  Filter,
  Star,
  Clock,
  Eye,
  Heart,
  Brain,
  Zap,
  Target,
  Users,
  TrendingUp,
  ExternalLink,
  Bookmark,
  Share
} from 'lucide-react';

// Mock resources data
const mockResources = [
  {
    id: 1,
    title: 'Mindfulness for Beginners',
    description: 'Learn the basics of mindfulness meditation to reduce stress and anxiety.',
    type: 'article',
    category: 'Mindfulness',
    duration: '10 min read',
    rating: 4.8,
    views: 1247,
    author: 'Dr. Sarah Wilson',
    publishedDate: '2025-07-15',
    tags: ['mindfulness', 'meditation', 'stress relief'],
    thumbnail: null,
    featured: true
  },
  {
    id: 2,
    title: 'Guided Breathing Exercise',
    description: 'A 15-minute guided breathing exercise to help you relax and center yourself.',
    type: 'audio',
    category: 'Breathing',
    duration: '15 min',
    rating: 4.9,
    views: 892,
    author: 'Michael Chen',
    publishedDate: '2025-07-20',
    tags: ['breathing', 'relaxation', 'guided meditation'],
    thumbnail: null,
    featured: false
  },
  {
    id: 3,
    title: 'Managing Workplace Stress',
    description: 'Practical strategies for dealing with stress in professional environments.',
    type: 'video',
    category: 'Workplace Wellness',
    duration: '25 min',
    rating: 4.7,
    views: 1653,
    author: 'Dr. Emily Brown',
    publishedDate: '2025-07-10',
    tags: ['work stress', 'professional development', 'coping strategies'],
    thumbnail: null,
    featured: true
  },
  {
    id: 4,
    title: 'Sleep Hygiene Checklist',
    description: 'A comprehensive guide to improving your sleep quality and establishing healthy habits.',
    type: 'worksheet',
    category: 'Sleep',
    duration: '5 min',
    rating: 4.6,
    views: 743,
    author: 'Sleep Wellness Team',
    publishedDate: '2025-07-25',
    tags: ['sleep', 'wellness', 'habits'],
    thumbnail: null,
    featured: false
  },
  {
    id: 5,
    title: 'Understanding Anxiety',
    description: 'Learn about anxiety disorders, their symptoms, and effective treatment approaches.',
    type: 'article',
    category: 'Mental Health Education',
    duration: '15 min read',
    rating: 4.8,
    views: 2104,
    author: 'Dr. Michael Chen',
    publishedDate: '2025-07-05',
    tags: ['anxiety', 'education', 'mental health'],
    thumbnail: null,
    featured: true
  },
  {
    id: 6,
    title: 'Progressive Muscle Relaxation',
    description: 'Step-by-step guide to progressive muscle relaxation technique.',
    type: 'audio',
    category: 'Relaxation',
    duration: '20 min',
    rating: 4.7,
    views: 567,
    author: 'Wellness Audio Team',
    publishedDate: '2025-07-18',
    tags: ['relaxation', 'muscle tension', 'stress relief'],
    thumbnail: null,
    featured: false
  }
];

const categories = ['All', 'Mindfulness', 'Breathing', 'Workplace Wellness', 'Sleep', 'Mental Health Education', 'Relaxation'];
const resourceTypes = ['All', 'Article', 'Video', 'Audio', 'Worksheet'];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([1, 3]);

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = mockResources.filter(resource => resource.featured);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      case 'worksheet':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mindfulness':
        return <Brain className="h-4 w-4" />;
      case 'Breathing':
        return <Heart className="h-4 w-4" />;
      case 'Workplace Wellness':
        return <Target className="h-4 w-4" />;
      case 'Sleep':
        return <Clock className="h-4 w-4" />;
      case 'Mental Health Education':
        return <BookOpen className="h-4 w-4" />;
      case 'Relaxation':
        return <Zap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const toggleBookmark = (resourceId: number) => {
    setBookmarkedItems(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  return (
    <DashboardLayout title="Wellness Resources">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wellness Resources</h1>
            <p className="text-gray-600 mt-1">Explore articles, videos, and tools to support your mental health journey</p>
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <div key={resource.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary-600 uppercase">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBookmark(resource.id)}
                      className={`p-1 rounded-full ${
                        bookmarkedItems.includes(resource.id)
                          ? 'text-yellow-500'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {resource.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-400" />
                      {resource.rating}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {resource.views}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">By {resource.author}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Share className="h-4 w-4" />
                      </button>
                      <button className="btn-primary text-sm px-3 py-1">
                        {resource.type === 'video' ? 'Watch' : 
                         resource.type === 'audio' ? 'Listen' : 'Read'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>

            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-600 uppercase">
                      {resource.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(resource.category)}
                      <span className="text-xs text-gray-500">{resource.category}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleBookmark(resource.id)}
                  className={`p-1 rounded-full ${
                    bookmarkedItems.includes(resource.id)
                      ? 'text-yellow-500'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {resource.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{resource.tags.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {resource.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-400" />
                  {resource.rating}
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {resource.views}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500">By {resource.author}</span>
                  <div className="text-xs text-gray-400">
                    {new Date(resource.publishedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="btn-primary text-sm px-3 py-1">
                    {resource.type === 'video' ? 'Watch' : 
                     resource.type === 'audio' ? 'Listen' : 'Read'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Quick Categories */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 border-dashed transition-colors ${
                  selectedCategory === category
                    ? 'border-primary-300 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  {getCategoryIcon(category)}
                </div>
                <span className="text-sm font-medium text-center">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}