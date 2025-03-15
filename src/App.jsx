import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaBuilding, FaCode, FaClock, FaCalendarAlt, FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const API_URL = "https://ps-backend-bt57.onrender.com/get-jobs";
const FETCH_JOBS_URL = "https://ps-backend-bt57.onrender.com/fetch-jobs";
const LIMIT = 10;

// Job source logos
const sourceLogo = {
  "Naukri": "https://static.naukimg.com/s/4/100/i/naukri_Logo.png",
  "LinkedIn": "https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2022/08/Linkedin-Logo-e1660320077673.png",
};

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    company: "",
    technology: "",
    source: "",
  });
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [currentTime, setCurrentTime] = useState("2025-03-14 14:02:48");
  const [currentUser, setCurrentUser] = useState("ShaikKhadeerBasha");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const fetchJobs = async (newOffset = 0, reset = false) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: { ...filters, limit: LIMIT, offset: newOffset },
      });

      const newJobs = response.data.jobs || [];
      if (reset) setJobs(newJobs);
      else setJobs((prevJobs) => [...prevJobs, ...newJobs]);

      setHasMore(response.data.has_more || newJobs.length === LIMIT);
      setOffset(newOffset + LIMIT);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonalizedJobs = async () => {
    try {
      await axios.get(FETCH_JOBS_URL, {
        params: { keyword: filters.keyword, location: filters.location },
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Error starting job fetch:", error);
    }
  };

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    fetchJobs(0, true);
  }, [filters]);

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 19).replace("T", " ");
      setCurrentTime(formattedTime);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadMoreJobs = () => fetchJobs(offset);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setOffset(0); // Reset pagination on new search
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchJobs(0, true);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Extract skills from job description
  const extractSkills = (description) => {
    const commonSkills = [
      "Java", "Python", "JavaScript", "React", "Angular", "Vue", "Node.js", 
      "C#", "C++", "Scala", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
      "SQL", "NoSQL", "MongoDB", "REST", "API", "Microservices", "SDLC",
      "Agile", "Scrum", "DevOps", "CI/CD", "Git", "PEGA"
    ];
    
    const skills = [];
    const desc = description.toLowerCase();
    
    commonSkills.forEach(skill => {
      if (desc.includes(skill.toLowerCase())) {
        skills.push(skill);
      }
    });
    
    return skills.slice(0, 3); // Limit to 3 skills
  };

  const openModal = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container animate-fade-in">
            <FaBriefcase className="logo-icon" />
            <h1>JobHub</h1>
          </div>
          <p className="tagline animate-slide-up">Find your dream job today</p>
          <div className="user-info animate-fade-in">
            <span className="username">{currentUser}</span>
            <span className="time-display">{currentTime}</span>
          </div>
        </div>
        
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 15}s`
            }}></div>
          ))}
        </div>
      </header>

      <div className="filters-toggle-container animate-fade-in">
        <button 
          className="toggle-filters-btn"
          onClick={toggleFilters}
        >
          {showFilters ? (
            <>Hide Filters <FaChevronUp className="toggle-icon" /></>
          ) : (
            <>Show Filters <FaChevronDown className="toggle-icon" /></>
          )}
        </button>
        <div className="search-stats">
          Found <span className="count-highlight">{jobs.length}</span> job opportunities
        </div>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className={`filters-container ${showFilters ? 'filters-show' : 'filters-hide'}`}
      >
        <div className="search-row">
          <div className="search-field">
            <FaSearch className="search-icon" />
            <input
              type="text"
              name="keyword"
              placeholder="Job title or keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
            />
            <span className="focus-border"></span>
          </div>
          
          <div className="search-field">
            <FaMapMarkerAlt className="search-icon" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
            />
            <span className="focus-border"></span>
          </div>
        </div>
        
        <div className="search-row">
          <div className="search-field">
            <FaBuilding className="search-icon" />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={filters.company}
              onChange={handleFilterChange}
            />
            <span className="focus-border"></span>
          </div>
          
          <div className="search-field">
            <FaCode className="search-icon" />
            <input
              type="text"
              name="technology"
              placeholder="Technology"
              value={filters.technology}
              onChange={handleFilterChange}
            />
            <span className="focus-border"></span>
          </div>
        </div>

        <div className="search-row">
          <div className="search-field">
            <select
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
              className="source-select"
            >
              <option value="">All Sources</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Naukri">Naukri</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="search-button"
        >
          <FaSearch className="button-icon" /> Search Jobs
        </button>
      </form>

      {/* Job List with Infinite Scroll */}
      <div id="scrollableDiv" className="scrollable-container">
        <InfiniteScroll
          dataLength={jobs.length}
          next={loadMoreJobs}
          hasMore={hasMore}
          loader={
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          }
          scrollableTarget="scrollableDiv"
          className="jobs-list"
        >
          {jobs.map((job, index) => {
            const skills = extractSkills(job.job_description);
            const isNew = new Date() - new Date(job.created_at) < 86400000; // 24 hours
            return (
              <div
                key={index}
                className={`job-card animate-in-${index % 3}`}
                onClick={() => openModal(job)}
              >
                <div className="job-header">
                  <div className="source-logo">
                    {job.source && sourceLogo[job.source] && (
                      <img 
                        src={sourceLogo[job.source]} 
                        alt={`${job.source} logo`} 
                        className="source-img"
                      />
                    )}
                    {isNew && <span className="new-tag pulse" style={{marginRight: "30px"}}>New</span>}
                  </div>
                  <h2 className="job-title">{job.title}</h2>
                </div>

                <div className="job-info-grid">
                  <div className="job-info-item">
                    <FaBuilding className="info-icon" />
                    <span>{job.company}</span>
                  </div>
                  
                  <div className="job-info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="job-info-item">
                    <FaCalendarAlt className="info-icon" />
                    <span>{job.created_at ? job.created_at.split('T')[0] : 'Recent'}</span>
                  </div>
                </div>

                {skills.length > 0 && (
                  <div className="job-tags">
                    {skills.map((skill, i) => (
                      <span key={i} className="job-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="job-description">
                  {job.job_description.replace(/<br>|<br\s*\/>|<\/?[^>]+(>|$)/g, " ").slice(0, 150)}...
                </p>
                
                <div className="job-footer">
                  <a 
                    href={job.job_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-job-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details <FaExternalLinkAlt className="link-icon" />
                  </a>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>

        {jobs.length === 0 && !loading && (
          <div className="no-jobs-container">
            <div className="no-jobs-icon">🔍</div>
            <h3 className="no-jobs-text">No jobs found matching your criteria</h3>
            <p className="no-jobs-suggestion">Try adjusting your search filters or click the button below to fetch personalized jobs.</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setFilters({
                  keyword: "",
                  location: "",
                  company: "",
                  technology: "",
                  source: "",
                });
              }}
            >
              Reset Filters
            </button>
            <button 
              className="fetch-jobs-btn"
              onClick={fetchPersonalizedJobs}
            >
              Fetch Personalized Jobs
            </button>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>
              <FaTimes />
            </button>
            <h2 className="modal-title">{selectedJob.title}</h2>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <div className="modal-description">
              <p><strong>Description:</strong> {selectedJob.job_description}</p>
            </div>
            <a 
              href={selectedJob.job_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-job-btn"
            >
              View Job Posting <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>© 2025 JobHub | Find Your Dream Career Today</p>
      </footer>

      {showToast && (
        <div className="toast">
          <p>Jobs will be added in 30-40 seconds. Please check back shortly.</p>
        </div>
      )}
    </div>
  );
};

export default App;