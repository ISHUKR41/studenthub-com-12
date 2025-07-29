import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  ExternalLink,
  Newspaper,
  Eye,
  Star,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  views: number;
  trending: boolean;
  imageUrl: string;
  tag: string;
}

export const NewsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { id: 'all', label: 'All News', count: 245 },
    { id: 'exams', label: 'Exam Updates', count: 89 },
    { id: 'results', label: 'Results', count: 67 },
    { id: 'admissions', label: 'Admissions', count: 54 },
    { id: 'scholarships', label: 'Scholarships', count: 35 }
  ];

  const newsData: NewsItem[] = [
    {
      id: '1',
      title: 'JEE Main 2024: Application Process Extended Till December 15th',
      excerpt: 'National Testing Agency extends JEE Main application deadline due to technical issues. Students can now apply with reduced fees.',
      category: 'exams',
      publishedAt: '2024-12-08',
      readTime: '3 min read',
      views: 12450,
      trending: true,
      imageUrl: '/api/placeholder/400/250',
      tag: 'Breaking'
    },
    {
      id: '2', 
      title: 'NEET UG 2024 Results: Cut-off Marks Released for All Categories',
      excerpt: 'Medical entrance exam results show significant changes in cut-off marks across different categories. Detailed analysis inside.',
      category: 'results',
      publishedAt: '2024-12-07',
      readTime: '5 min read',
      views: 18900,
      trending: true,
      imageUrl: '/api/placeholder/400/250',
      tag: 'Important'
    },
    {
      id: '3',
      title: 'New Government Scholarship Worth ₹2 Lakh for Engineering Students',
      excerpt: 'Ministry of Education announces new scholarship program for meritorious students pursuing engineering degrees.',
      category: 'scholarships',
      publishedAt: '2024-12-06',
      readTime: '4 min read',
      views: 8750,
      trending: false,
      imageUrl: '/api/placeholder/400/250',
      tag: 'Opportunity'
    },
    {
      id: '4',
      title: 'IIT Admission Portal Opens: Direct Entry for International Students',
      excerpt: 'IITs introduce new admission pathway for international students with special quotas and simplified procedures.',
      category: 'admissions',
      publishedAt: '2024-12-05',
      readTime: '6 min read',
      views: 15200,
      trending: true,
      imageUrl: '/api/placeholder/400/250',
      tag: 'Update'
    }
  ];

  const filteredNews = newsData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="news" className="py-16 lg:py-24 bg-background-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div ref={ref} className="container mx-auto px-4 lg:px-6 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Latest Updates
            </Badge>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Education News Hub
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest exam notifications, results, admission deadlines, 
            and scholarship opportunities from across India
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2
                    ${activeCategory === category.id 
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                      : 'bg-background border-border hover:border-primary/50 text-foreground-secondary hover:text-primary'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="glass-intense hover:border-primary/30 transition-all duration-500 h-full flex flex-col overflow-hidden">
                {/* News Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Newspaper className="h-16 w-16 text-primary/50" />
                  </div>
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={`
                      ${news.tag === 'Breaking' ? 'bg-red-500' : 
                        news.tag === 'Important' ? 'bg-orange-500' :
                        news.tag === 'Opportunity' ? 'bg-green-500' : 'bg-blue-500'
                      } text-white
                    `}>
                      {news.tag}
                    </Badge>
                  </div>

                  {news.trending && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-primary text-white flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-sm text-foreground-secondary mb-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(news.publishedAt).toLocaleDateString()}
                    <Clock className="h-4 w-4 ml-2" />
                    {news.readTime}
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-foreground-secondary text-sm leading-relaxed line-clamp-3 mb-4">
                    {news.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-foreground-secondary">
                      <Eye className="h-4 w-4" />
                      {news.views.toLocaleString()} views
                    </div>

                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-primary hover:text-primary-foreground hover:bg-primary p-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All News CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="btn-hero px-8 py-4 text-lg"
          >
            <Newspaper className="mr-2 h-5 w-5" />
            View All News & Updates
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};