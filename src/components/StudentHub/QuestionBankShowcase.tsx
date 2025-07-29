import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Download,
  Eye,
  Star,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Search,
  FileText,
  Award,
  Target,
  Zap,
  ChevronRight,
  Calendar,
  Globe
} from 'lucide-react';

interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  class: string;
  board: string;
  year: string;
  examType: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  duration: string;
  downloads: number;
  rating: number;
  featured: boolean;
  language: string;
  category: string;
}

export const QuestionBankShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filters = [
    { id: 'all', label: 'All Papers', count: 25000 },
    { id: 'jee', label: 'JEE Main/Advanced', count: 2500 },
    { id: 'neet', label: 'NEET', count: 1800 },
    { id: 'boards', label: 'Board Exams', count: 15000 },
    { id: 'competitive', label: 'Competitive', count: 3200 },
    { id: 'mock', label: 'Mock Tests', count: 2500 }
  ];

  const years = ['2024', '2023', '2022', '2021', '2020'];

  const questionPapers: QuestionPaper[] = [
    {
      id: '1',
      title: 'JEE Main 2024 Physics January Session',
      subject: 'Physics',
      class: '12th',
      board: 'NTA',
      year: '2024',
      examType: 'JEE Main',
      difficulty: 'Hard',
      questions: 90,
      duration: '3h 00m',
      downloads: 25478,
      rating: 4.8,
      featured: true,
      language: 'English & Hindi',
      category: 'jee'
    },
    {
      id: '2',
      title: 'NEET Biology Chapter-wise Practice Set',
      subject: 'Biology',
      class: '12th',
      board: 'NTA',
      year: '2024',
      examType: 'NEET',
      difficulty: 'Medium',
      questions: 180,
      duration: '3h 20m',
      downloads: 18965,
      rating: 4.7,
      featured: true,
      language: 'English',
      category: 'neet'
    },
    {
      id: '3',
      title: 'CBSE Class 12 Mathematics Board Exam',
      subject: 'Mathematics',
      class: '12th',
      board: 'CBSE',
      year: '2024',
      examType: 'Board Exam',
      difficulty: 'Medium',
      questions: 38,
      duration: '3h 15m',
      downloads: 45632,
      rating: 4.9,
      featured: false,
      language: 'English & Hindi',
      category: 'boards'
    },
    {
      id: '4',
      title: 'JEE Advanced 2023 Chemistry Paper 1',
      subject: 'Chemistry',
      class: '12th',
      board: 'IIT',
      year: '2023',
      examType: 'JEE Advanced',
      difficulty: 'Hard',
      questions: 54,
      duration: '3h 00m',
      downloads: 15789,
      rating: 4.6,
      featured: true,
      language: 'English',
      category: 'jee'
    }
  ];

  const stats = [
    { icon: FileText, value: '25,000+', label: 'Question Papers', increment: '+500 weekly' },
    { icon: Download, value: '5M+', label: 'Downloads', increment: '+50K daily' },
    { icon: Users, value: '2M+', label: 'Active Users', increment: '+10K monthly' },
    { icon: Globe, value: '22+', label: 'Languages', increment: 'Expanding' },
    { icon: Award, value: '500+', label: 'Exams Covered', increment: '+25 recently' },
    { icon: Star, value: '4.8/5', label: 'User Rating', increment: '99% satisfaction' }
  ];

  const filteredPapers = questionPapers.filter(paper => {
    const matchesFilter = activeFilter === 'all' || paper.category === activeFilter;
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = paper.year === selectedYear;
    return matchesFilter && matchesSearch && matchesYear;
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
    <section id="question-bank" className="py-16 lg:py-24 bg-background-tertiary relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
      />

      <div ref={ref} className="container mx-auto px-4 lg:px-6 relative">
        {/* Header */}
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
            <motion.div 
              className="p-3 bg-gradient-secondary rounded-xl"
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <BookOpen className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="bg-gradient-primary text-white text-lg px-4 py-2">
              MASSIVE COLLECTION
            </Badge>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Ultimate Question Bank
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Access India's largest collection of previous year questions, mock tests, and practice papers. 
            From JEE to NEET, Board exams to competitive tests - we have it all!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <Card className="glass-intense hover:border-primary/30 transition-all duration-500 text-center p-4 hover:scale-105">
                <motion.div 
                  className="flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="text-2xl md:text-3xl font-bold gradient-text mb-1"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                
                <div className="text-xs text-primary/80">
                  {stat.increment}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Controls */}
        <motion.div 
          className="mb-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Search and Year Filter */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search question papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-foreground-secondary font-medium">Year:</span>
              <div className="flex gap-2">
                {years.map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`
                      px-4 py-2 rounded-lg border transition-all duration-300
                      ${selectedYear === year 
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                        : 'bg-background border-border hover:border-primary/50 text-foreground-secondary hover:text-primary'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2
                  ${activeFilter === filter.id 
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                    : 'bg-background border-border hover:border-primary/50 text-foreground-secondary hover:text-primary'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
                <Badge variant="secondary" className="text-xs">
                  {filter.count > 1000 ? `${(filter.count/1000).toFixed(1)}K` : filter.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Question Papers Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AnimatePresence>
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
              layout
              >
                <Card className="glass-intense hover:border-primary/30 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  {/* Paper Header */}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={`
                        ${paper.difficulty === 'Easy' ? 'bg-green-500' :
                          paper.difficulty === 'Medium' ? 'bg-yellow-500' :
                          'bg-red-500'
                        } text-white text-xs
                      `}>
                        {paper.difficulty}
                      </Badge>
                      
                      {paper.featured && (
                        <Badge className="bg-gradient-primary text-white flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {paper.title}
                    </h3>
                    
                    <div className="space-y-1 text-sm text-foreground-secondary">
                      <div className="flex items-center justify-between">
                        <span>{paper.board} • {paper.year}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{paper.rating}</span>
                        </div>
                      </div>
                      <div>{paper.subject} • Class {paper.class}</div>
                      <div className="text-xs text-primary/80">{paper.language}</div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    {/* Paper Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-background/50 rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-primary mb-1">
                          <FileText className="h-3 w-3" />
                          <span className="text-xs font-semibold">Questions</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{paper.questions}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs font-semibold">Duration</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{paper.duration}</p>
                      </div>
                    </div>

                    {/* Download Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-foreground-secondary">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {paper.downloads.toLocaleString()} downloads
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full btn-hero group-hover:shadow-lg transition-all"
                        size="sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Quick Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="glass-intense max-w-3xl mx-auto p-8">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="text-3xl font-bold gradient-text">
                Start Your Preparation Today
              </h3>
            </motion.div>
            
            <p className="text-foreground-secondary mb-8 text-lg">
              Join millions of students who have aced their exams with our comprehensive question bank. 
              Download unlimited papers and boost your exam preparation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero px-8 py-4">
                <Download className="mr-2 h-5 w-5" />
                Download Free Papers
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4">
                <Zap className="mr-2 h-5 w-5" />
                Upgrade to Premium
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};