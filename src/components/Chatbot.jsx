import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you learn about chronic disease prevention. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Enhanced state management for personalization, routing, and conversation memory
  const [userState, setUserState] = useState({
    userName: null,
    careRecipientName: null,
    assessmentType: null, // 'self', 'caregiver', 'curious'
    conversationContext: [],
    conversationHistory: [], // Full message history with metadata
    userPreferences: {
      preferredProgramType: null, // 'in-person', 'virtual', 'hybrid'
      topicsOfInterest: [], // ['diabetes', 'heart-disease', 'nutrition', etc.]
      previousAssessments: [], // Track completed assessments
      locationPreference: null,
      communicationStyle: 'friendly' // 'formal', 'friendly', 'casual'
    },
    sessionMetadata: {
      sessionId: Date.now().toString(),
      startTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messageCount: 0,
      topicsDiscussed: [],
      questionsAsked: [],
      resourcesShared: []
    }
  });

  // Enhanced conversation memory state
  const [conversationMemory, setConversationMemory] = useState({
    keyTopics: [], // Important topics discussed
    userGoals: [], // What the user is trying to achieve
    previousRecommendations: [], // Recommendations already given
    followUpNeeded: [], // Items that need follow-up
    conversationSummary: '', // AI-generated summary of key points
    contextualCues: [], // Important context for future responses
    questionsAsked: [], // Track what questions have been asked to avoid loops
    formatPreferenceSet: false // Track if user has already specified format preference
  });

  // Note: Removed localStorage persistence - chatbot now clears on browser refresh
  // but maintains context within the current session

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function to update conversation memory
  const updateConversationMemory = (userInput, botResponse, extractedContext) => {
    const topics = extractTopicsFromText(userInput + ' ' + botResponse);
    const goals = extractGoalsFromText(userInput);
    const recommendations = extractRecommendationsFromText(botResponse);
    
    setConversationMemory(prev => ({
      ...prev,
      keyTopics: [...new Set([...prev.keyTopics, ...topics])],
      userGoals: [...new Set([...prev.userGoals, ...goals])],
      previousRecommendations: [...new Set([...prev.previousRecommendations, ...recommendations])],
      contextualCues: [
        ...prev.contextualCues.slice(-10), // Keep last 10 cues
        {
          timestamp: new Date().toISOString(),
          userInput: userInput,
          botResponse: botResponse,
          extractedContext: extractedContext,
          topics: topics,
          recommendations: recommendations
        }
      ]
    }));
  };

  // Helper function to extract recommendations from bot responses
  const extractRecommendationsFromText = (text) => {
    const recommendationKeywords = [
      'recommend', 'suggest', 'try', 'consider', 'should', 'might want to',
      'assessment', 'program', 'exercise', 'diet', 'lifestyle change'
    ];
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const recommendations = [];
    
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      if (recommendationKeywords.some(keyword => lowerSentence.includes(keyword))) {
        recommendations.push(sentence.trim());
      }
    });
    
    return recommendations.slice(0, 3); // Keep top 3 recommendations per response
  };

  // Helper function to extract topics from text
  const extractTopicsFromText = (text) => {
    const topicKeywords = {
      'diabetes': ['diabetes', 'diabetic', 'blood sugar', 'glucose', 'insulin'],
      'heart-disease': ['heart', 'cardiac', 'cardiovascular', 'blood pressure', 'cholesterol'],
      'nutrition': ['diet', 'food', 'eating', 'nutrition', 'meal', 'calories'],
      'exercise': ['exercise', 'physical activity', 'workout', 'fitness', 'walking'],
      'weight': ['weight', 'obesity', 'bmi', 'overweight', 'lose weight'],
      'smoking': ['smoking', 'tobacco', 'cigarette', 'quit smoking'],
      'stress': ['stress', 'anxiety', 'mental health', 'depression'],
      'programs': ['program', 'class', 'course', 'prevention program'],
      'assessment': ['assessment', 'risk', 'evaluation', 'test', 'quiz']
    };

    const detectedTopics = [];
    const lowerText = text.toLowerCase();

    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        detectedTopics.push(topic);
      }
    });

    return detectedTopics;
  };

  // Helper function to extract user goals from text
  const extractGoalsFromText = (text) => {
    const goalPatterns = [
      /want to (.*?)(?:\.|$)/gi,
      /need to (.*?)(?:\.|$)/gi,
      /trying to (.*?)(?:\.|$)/gi,
      /looking for (.*?)(?:\.|$)/gi,
      /help me (.*?)(?:\.|$)/gi,
      /i'd like to (.*?)(?:\.|$)/gi
    ];

    const goals = [];
    goalPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && match[1].trim().length > 3) {
          goals.push(match[1].trim());
        }
      }
    });

    return goals;
  };

  // Helper function to update user preferences based on conversation
  const updateUserPreferences = (userInput, extractedContext) => {
    setUserState(prev => {
      const newPreferences = { ...prev.userPreferences };
      
      // Update program type preference
      if (userInput.toLowerCase().includes('virtual') || userInput.toLowerCase().includes('online')) {
        newPreferences.preferredProgramType = 'virtual';
      } else if (userInput.toLowerCase().includes('in-person') || userInput.toLowerCase().includes('face to face')) {
        newPreferences.preferredProgramType = 'in-person';
      } else if (userInput.toLowerCase().includes('hybrid') || userInput.toLowerCase().includes('combination')) {
        newPreferences.preferredProgramType = 'hybrid';
      }

      // Update topics of interest
      const topics = extractTopicsFromText(userInput);
      newPreferences.topicsOfInterest = [...new Set([...newPreferences.topicsOfInterest, ...topics])];

      // Update session metadata
      const newSessionMetadata = {
        ...prev.sessionMetadata,
        lastActivity: new Date().toISOString(),
        messageCount: prev.sessionMetadata.messageCount + 1,
        topicsDiscussed: [...new Set([...prev.sessionMetadata.topicsDiscussed, ...topics])]
      };

      return {
        ...prev,
        userPreferences: newPreferences,
        sessionMetadata: newSessionMetadata,
        conversationHistory: [
          ...prev.conversationHistory,
          {
            timestamp: new Date().toISOString(),
            userInput: userInput,
            extractedContext: extractedContext,
            topics: topics
          }
        ]
      };
    });
  };

  // Function to generate conversation summary for AI context
  const generateConversationSummary = () => {
    const recentHistory = userState.conversationHistory.slice(-10); // Last 10 interactions
    const keyTopics = conversationMemory.keyTopics.slice(0, 5); // Top 5 topics
    const userGoals = conversationMemory.userGoals.slice(0, 3); // Top 3 goals
    
    let summary = '';
    
    if (userState.userName) {
      summary += `User: ${userState.userName}. `;
    }
    
    if (userState.careRecipientName) {
      summary += `Caring for: ${userState.careRecipientName}. `;
    }
    
    if (keyTopics.length > 0) {
      summary += `Topics discussed: ${keyTopics.join(', ')}. `;
    }
    
    if (userGoals.length > 0) {
      summary += `User goals: ${userGoals.join('; ')}. `;
    }
    
    if (userState.userPreferences.preferredProgramType) {
      summary += `Prefers ${userState.userPreferences.preferredProgramType} programs. `;
    }
    
    if (conversationMemory.previousRecommendations.length > 0) {
      summary += `Previous recommendations: ${conversationMemory.previousRecommendations.slice(-3).join('; ')}. `;
    }

    return summary;
  };

  // Helper function to detect if user is responding to a question
  const detectQuestionResponse = (userInput, messages) => {
    if (messages.length < 2) return null;
    
    const lastBotMessage = [...messages].reverse().find(msg => msg.sender === 'bot');
    if (!lastBotMessage) return null;
    
    const input = userInput.toLowerCase().trim();
    const botText = lastBotMessage.text.toLowerCase();
    
    // Check if the last bot message contained a question
    const hasQuestion = botText.includes('?') || 
                       botText.includes('would you like') ||
                       botText.includes('do you') ||
                       botText.includes('are you') ||
                       botText.includes('can you') ||
                       botText.includes('should i') ||
                       botText.includes('which') ||
                       botText.includes('what') ||
                       botText.includes('how') ||
                       botText.includes('when') ||
                       botText.includes('where');
    
    if (!hasQuestion) return null;
    
    // Detect yes/no responses
    const yesPatterns = [
      /^yes$/i, /^yeah$/i, /^yep$/i, /^sure$/i, /^okay$/i, /^ok$/i, /^y$/i,
      /^yes please$/i, /^yes i would$/i, /^yes i do$/i, /^yes i am$/i,
      /^that would be great$/i, /^sounds good$/i, /^i would like that$/i,
      /^absolutely$/i, /^definitely$/i, /^of course$/i
    ];
    
    const noPatterns = [
      /^no$/i, /^nope$/i, /^nah$/i, /^n$/i, /^no thanks$/i, /^no thank you$/i,
      /^not really$/i, /^not interested$/i, /^i don't think so$/i,
      /^maybe later$/i, /^not now$/i, /^not right now$/i
    ];
    
    const isYes = yesPatterns.some(pattern => pattern.test(input));
    const isNo = noPatterns.some(pattern => pattern.test(input));
    
    if (isYes || isNo) {
      return {
        type: 'yes_no',
        answer: isYes ? 'yes' : 'no',
        originalQuestion: lastBotMessage.text,
        questionContext: extractQuestionContext(lastBotMessage.text)
      };
    }
    
    // Detect specific answer patterns
    const specificAnswers = detectSpecificAnswers(input, botText);
    if (specificAnswers) {
      return {
        type: 'specific',
        answer: specificAnswers,
        originalQuestion: lastBotMessage.text,
        questionContext: extractQuestionContext(lastBotMessage.text)
      };
    }
    
    return null;
  };

  // Helper function to extract context from questions
  const extractQuestionContext = (questionText) => {
    const text = questionText.toLowerCase();
    
    if (text.includes('assessment') || text.includes('risk')) {
      return 'assessment';
    }
    if (text.includes('program') || text.includes('class')) {
      return 'programs';
    }
    if (text.includes('cost') || text.includes('budget') || text.includes('afford')) {
      return 'cost';
    }
    if (text.includes('location') || text.includes('area') || text.includes('city')) {
      return 'location';
    }
    if (text.includes('schedule') || text.includes('time') || text.includes('when')) {
      return 'schedule';
    }
    if (text.includes('virtual') || text.includes('online') || text.includes('in-person')) {
      return 'delivery_mode';
    }
    if (text.includes('insurance') || text.includes('medicare') || text.includes('medicaid')) {
      return 'insurance';
    }
    
    return 'general';
  };

  // Helper function to detect specific answers (not just yes/no)
  const detectSpecificAnswers = (input, questionText) => {
    // Detect delivery mode preferences - improved detection
    if (questionText.includes('format') || questionText.includes('delivery') || questionText.includes('virtual') || questionText.includes('in-person') || questionText.includes('program')) {
      if (input.includes('virtual') || input.includes('online') || input.includes('remote') || input.includes('zoom') || input.includes('video')) {
        return { type: 'delivery_mode', value: 'virtual-live' };
      }
      if (input.includes('in-person') || input.includes('face to face') || input.includes('physical') || input.includes('person') || input.includes('location')) {
        return { type: 'delivery_mode', value: 'in-person' };
      }
      if (input.includes('hybrid') || input.includes('both') || input.includes('combination') || input.includes('mixed')) {
        return { type: 'delivery_mode', value: 'hybrid' };
      }
    }
    
    // Detect location answers
    if (questionText.includes('location') || questionText.includes('area') || questionText.includes('city')) {
      // Simple city/state detection
      const locationMatch = input.match(/([a-zA-Z\s]+),?\s*([A-Z]{2})/);
      if (locationMatch) {
        return { type: 'location', value: { city: locationMatch[1].trim(), state: locationMatch[2] } };
      }
      // Just city name
      const cityMatch = input.match(/^([a-zA-Z\s]+)$/);
      if (cityMatch && cityMatch[1].length > 2) {
        return { type: 'location', value: { city: cityMatch[1].trim() } };
      }
    }
    
    // Detect cost preferences
    if (questionText.includes('cost') || questionText.includes('budget') || questionText.includes('afford')) {
      const costMatch = input.match(/\$?(\d+)/);
      if (costMatch) {
        return { type: 'cost', value: parseInt(costMatch[1]) };
      }
      if (input.includes('free') || input.includes('no cost')) {
        return { type: 'cost', value: 0 };
      }
      if (input.includes('low cost') || input.includes('cheap') || input.includes('affordable')) {
        return { type: 'cost', value: 'low' };
      }
    }
    
    return null;
  };

  // Function to handle question responses
  const handleQuestionResponse = async (questionResponse, userInput, contextUpdate) => {
    const { type, answer, questionContext } = questionResponse;
    
    let responseText = '';
    let quickOptions = [];
    
    if (type === 'yes_no') {
      if (answer === 'yes') {
        switch (questionContext) {
          case 'assessment':
            responseText = `Great! I'll help you get started with the risk assessment. This will give you personalized insights about your health risks and prevention strategies.`;
            quickOptions = ["Take assessment now", "Tell me more about it first"];
            break;
          case 'programs':
            responseText = `Excellent! I'd be happy to help you find the right prevention program. Let me search for options that match your needs.`;
            quickOptions = ["Find programs near me", "virtual programs", "Show me all options"];
            break;
          case 'cost':
            responseText = `I understand cost is important to you. Let me focus on affordable and free program options.`;
            // Update user preferences
            updateUserPreferences('cost is important', contextUpdate);
            break;
          case 'location':
            responseText = `Perfect! Location is definitely important for in-person programs. What area would work best for you?`;
            quickOptions = ["Atlanta area", "Savannah area", "I'm flexible with location"];
            break;
          default:
            responseText = `Great! I'm here to help you with whatever you need regarding chronic disease prevention.`;
            quickOptions = ["Find prevention programs", "Take risk assessment", "Learn about healthy lifestyle"];
        }
      } else { // answer === 'no'
        switch (questionContext) {
          case 'assessment':
            responseText = `No problem! Is there something specific about chronic disease prevention you'd like to learn about instead?`;
            quickOptions = ["Tell me about diabetes prevention", "Find prevention programs", "Learn about healthy eating"];
            break;
          case 'programs':
            responseText = `That's okay! Maybe I can help you with information about prevention strategies or answer any questions you have.`;
            quickOptions = ["Learn prevention tips", "Ask a question", "Take risk assessment"];
            break;
          case 'cost':
            responseText = `I understand. Let me show you all available options regardless of cost.`;
            break;
          default:
            responseText = `No worries! What would you like to know about chronic disease prevention?`;
            quickOptions = ["Prevention tips", "Risk factors", "Healthy lifestyle advice"];
        }
      }
    } else if (type === 'specific') {
      const specificAnswer = questionResponse.answer;
      
      if (specificAnswer.type === 'delivery_mode') {
        // Update user preferences first
        updateUserPreferences(`${specificAnswer.value} programs preferred`, contextUpdate);
        
        // Mark that format preference has been set
        setConversationMemory(prev => ({
          ...prev,
          formatPreferenceSet: true,
          questionsAsked: [...prev.questionsAsked, 'format_preference']
        }));
        
        // Now search for programs with this preference
        try {
          const programs = await searchProgramsByDeliveryMode(specificAnswer.value);
          if (programs.length > 0) {
            responseText = `Perfect! I found ${programs.length} ${specificAnswer.value} program${programs.length > 1 ? 's' : ''} for you:\n\n`;
            
            // Show first 3 programs
            const programsToShow = programs.slice(0, 3);
            programsToShow.forEach((program, index) => {
              responseText += `${index + 1}. **${program.organization_name}**\n`;
              responseText += `📍 ${program.city}, ${program.state}\n`;
              if (program.cost) responseText += `💰 Cost: $${program.cost}\n`;
              if (program.duration_weeks) responseText += `📅 Duration: ${program.duration_weeks} weeks\n`;
              responseText += `\n`;
            });
            
            responseText += `Would you like more details about any of these programs?`;
            quickOptions = ["Tell me more about these programs", "Find programs in my area", "Compare with other formats"];
          } else {
            responseText = `I understand you prefer ${specificAnswer.value} programs. Let me search more broadly for programs that might work for you.`;
            quickOptions = ["Search all programs", "Tell me about other formats", "Help me find alternatives"];
          }
        } catch (error) {
          responseText = `Perfect! I'll focus on ${specificAnswer.value} programs for you. Let me search for options that match your preference.`;
          quickOptions = ["Find programs now", "Tell me more about this format", "I want to compare options"];
        }
      } else if (specificAnswer.type === 'location') {
        const location = specificAnswer.value;
        responseText = `Great! I'll look for programs in ${location.city}${location.state ? `, ${location.state}` : ''}. Let me search for options in your area.`;
        quickOptions = ["Search programs now", "I'm flexible with nearby areas", "Show me virtual options too"];
      } else if (specificAnswer.type === 'cost') {
        if (specificAnswer.value === 0) {
          responseText = `Perfect! I'll focus on free programs for you. There are several no-cost options available.`;
        } else if (specificAnswer.value === 'low') {
          responseText = `I understand you're looking for affordable options. I'll show you low-cost and sliding-scale programs.`;
        } else {
          responseText = `Got it! I'll look for programs within your $${specificAnswer.value} budget.`;
        }
        quickOptions = ["Find affordable programs", "Tell me about free options", "Show me all programs"];
      }
    }
    
    return {
      id: Date.now() + 1,
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      quickOptions: quickOptions.length > 0 ? quickOptions : undefined
    };
  };

  // Function to clear conversation history and reset memory
  const clearConversationHistory = () => {
    // Reset messages to initial state
    setMessages([
      {
        id: 1,
        text: "Hello! I'm here to help you learn about chronic disease prevention. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);

    // Reset conversation memory but keep user preferences
    setConversationMemory({
      keyTopics: [],
      userGoals: [],
      previousRecommendations: [],
      followUpNeeded: [],
      conversationSummary: '',
      contextualCues: [],
      questionsAsked: [],
      formatPreferenceSet: false
    });

    // Reset conversation history but keep basic user info
    setUserState(prev => ({
      ...prev,
      conversationContext: [],
      conversationHistory: [],
      sessionMetadata: {
        ...prev.sessionMetadata,
        sessionId: Date.now().toString(),
        startTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        messageCount: 0,
        topicsDiscussed: [],
        questionsAsked: [],
        resourcesShared: []
      }
    }));
  };

  // Helper function to extract names and context from user input
  const extractUserContext = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Detect names (simple pattern matching)
    const namePatterns = [
      /my name is (\w+)/i,
      /i'm (\w+)/i,
      /call me (\w+)/i,
      /i am (\w+)/i
    ];
    
    const carePatterns = [
      /my (\w+) (\w+)/i, // "my mom Sarah", "my dad John"
      /(\w+) is my (\w+)/i, // "Sarah is my mom"
      /caring for (\w+)/i,
      /worried about (\w+)/i,
      /(\w+)'s health/i
    ];

    let detectedUserName = userState.userName;
    let detectedCareRecipient = userState.careRecipientName;
    let detectedAssessmentType = userState.assessmentType;

    // Extract user name
    for (const pattern of namePatterns) {
      const match = userInput.match(pattern);
      if (match && match[1]) {
        detectedUserName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        break;
      }
    }

    // Extract care recipient name and determine assessment type
    for (const pattern of carePatterns) {
      const match = userInput.match(pattern);
      if (match) {
        if (pattern.toString().includes('my (\\\w+) (\\\w+)')) {
          // "my mom Sarah" format
          detectedCareRecipient = match[2].charAt(0).toUpperCase() + match[2].slice(1);
          detectedAssessmentType = 'caregiver';
        } else if (pattern.toString().includes('(\\\w+) is my')) {
          // "Sarah is my mom" format
          detectedCareRecipient = match[1].charAt(0).toUpperCase() + match[1].slice(1);
          detectedAssessmentType = 'caregiver';
        } else {
          detectedCareRecipient = match[1].charAt(0).toUpperCase() + match[1].slice(1);
          detectedAssessmentType = 'caregiver';
        }
        break;
      }
    }

    // Detect assessment intent
    if (input.includes('myself') || input.includes('my health') || input.includes('my risk')) {
      detectedAssessmentType = 'self';
    } else if (input.includes('just curious') || input.includes('general information') || input.includes('learning about')) {
      detectedAssessmentType = 'curious';
    }

    return {
      userName: detectedUserName,
      careRecipientName: detectedCareRecipient,
      assessmentType: detectedAssessmentType
    };
  };

  // Check if user wants to take assessment (more specific now)
  const shouldRouteToAssessment = (userInput) => {
    const directAssessmentKeywords = [
      'take assessment', 'take the assessment', 'take the risk assessment', 'start assessment', 'start the assessment',
      'i want to take', 'begin assessment', 'do the assessment', 'answer questions',
      'answer some questions', 'take test', 'start test','quiz', 'take quiz','test', 'start test', 'take test'
    ];
    
    return directAssessmentKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
  };

  // Check if user wants assessment for someone else
  const isAssessmentForOthers = (userInput) => {
    const input = userInput.toLowerCase();
    const forOthersKeywords = [
      'assessment for', 'take it for', 'for my', 'for someone', 'for a family member',
      'for my mom', 'for my dad', 'for my husband', 'for my wife', 'for my parent',
      'for my child', 'for my partner', 'on behalf of', 'help someone else',
      'someone i care about', 'family member', 'loved one'
    ];
    
    return forOthersKeywords.some(keyword => input.includes(keyword));
  };

  // Check if user is asking about risk (but not requesting assessment)
  const isRiskInquiry = (userInput) => {
    const riskKeywords = [
      'am i at risk', 'my risk', 'risk for', 'check my risk', 'evaluate my risk'
    ];
    
    return riskKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    ) && !shouldRouteToAssessment(userInput);
  };

  // Check if user wants to find lifestyle programs
  const shouldRouteToPrograms = (userInput) => {
    const programKeywords = [
      'find prevention programs', 'find programs', 'lifestyle programs',
      'prevention programs', 'local programs', 'find a program', 'program near me',
      'diabetes prevention program', 'lifestyle change program'
    ];
    
    return programKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
  };

  // Check if user is asking about a specific program or organization
  const shouldSearchPrograms = (userInput) => {
    const input = userInput.toLowerCase();
    const searchKeywords = [
      'tell me about', 'more about', 'information about', 'details about',
      'what is', 'describe', 'explain', 'lci', 'community health center',
      'health center', 'medical center', 'clinic', 'hospital'
    ];
    
    // Check if user mentions a program-related search
    return searchKeywords.some(keyword => input.includes(keyword)) && 
           (input.includes('program') || input.includes('center') || input.includes('lci') || 
            input.includes('clinic') || input.includes('hospital') || input.includes('organization'));
  };

  // Function to search for programs via API
  const searchProgramsFromDatabase = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:3004/api/programs/search-by-name?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();
      return data.programs || [];
    } catch (error) {
      console.error('Error searching programs:', error);
      return [];
    }
  };

  // Function to perform semantic search using vector embeddings
  const performSemanticSearch = async (query, conversationHistory = []) => {
    try {
      const response = await fetch('http://localhost:3004/api/programs/semantic-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          conversation_history: conversationHistory,
          limit: 5
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to perform semantic search');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error performing semantic search:', error);
      return null;
    }
  };

  // Function to search programs by delivery mode (fallback)
  const searchProgramsByDeliveryMode = async (deliveryMode) => {
    try {
      const response = await fetch(`http://localhost:3004/api/programs/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();
      
      // Filter by delivery mode
      const filteredPrograms = data.programs.filter(program => 
        program.delivery_mode && program.delivery_mode.toLowerCase() === deliveryMode.toLowerCase()
      );
      
      return filteredPrograms || [];
    } catch (error) {
      console.error('Error searching programs by delivery mode:', error);
      return [];
    }
  };

  // Function to detect if user is asking for specific delivery mode
  const detectDeliveryModeRequest = (userInput) => {
    const input = userInput.toLowerCase();
    
    console.log('Detecting delivery mode for input:', input);
    
    // Check for hybrid programs
    if (input.includes('hybrid') || input.includes('combination') || input.includes('mixed') || input.includes('both') || input.includes('hybrid programs')) {
      console.log('Detected hybrid preference');
      return 'hybrid';
    }
    // Check for in-person programs
    if (input.includes('in-person') || input.includes('in person') || input.includes('face to face') || input.includes('face-to-face') || input.includes('person') || input.includes('location') || input.includes('in-person programs')) {
      console.log('Detected in-person preference');
      return 'in-person';
    }
    // Check for virtual programs
    if (input.includes('virtual') || input.includes('online') || input.includes('remote') || input.includes('zoom') || input.includes('video') || input.includes('virtual programs') || input.includes('online programs')) {
      console.log('Detected virtual preference');
      return 'virtual-live';
    }
    
    console.log('No delivery mode detected');
    return null;
  };

  // Function to render formatted text with bold support
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    // Split text by newlines and process each line
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Skip empty lines but preserve spacing
      if (line.trim() === '') {
        return <div key={lineIndex} style={{ height: '0.8em' }}></div>;
      }
      
      // Process bold formatting **text** -> <strong>text</strong>
      const parts = line.split(/\*\*(.*?)\*\*/g);
      
      const formattedLine = parts.map((part, partIndex) => {
        // Every odd index is between ** markers, so should be bold
        if (partIndex % 2 === 1) {
          return <strong key={partIndex} style={{ fontWeight: '700', color: 'inherit' }}>{part}</strong>;
        }
        return part;
      });
      
      return (
        <div key={lineIndex} style={{ marginBottom: lineIndex < lines.length - 1 ? '0.2em' : '0' }}>
          {formattedLine}
        </div>
      );
    });
  };

  // Function to format program information for chat display
  const formatProgramInfo = (program) => {
    let info = `${program.organization_name}\n\n`;
    
    if (program.description) {
      info += `${program.description}\n\n`;
    }
    
    info += `📍 Location: ${program.city}, ${program.state} ${program.zip_code}\n`;
    
    if (program.delivery_mode) {
      info += `🏥 Delivery: ${program.delivery_mode}\n`;
    }
    
    if (program.cost) {
      info += `💰 Cost: $${program.cost}\n`;
    }
    
    if (program.duration_weeks) {
      info += `📅 Duration: ${program.duration_weeks} weeks\n`;
    }
    
    if (program.class_schedule) {
      info += `🕐 Schedule: ${program.class_schedule}\n`;
    }
    
    if (program.enrollment_status) {
      const statusEmoji = program.enrollment_status === 'open' ? '✅' : 
                         program.enrollment_status === 'closed' ? '❌' : '⏳';
      info += `${statusEmoji} Status: ${program.enrollment_status}\n`;
    }
    
    if (program.contact_phone) {
      info += `📞 Phone: ${program.contact_phone}\n`;
    }
    
    if (program.contact_email) {
      info += `📧 Email: ${program.contact_email}\n`;
    }
    
    return info;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Extract context and update user state
    const contextUpdate = extractUserContext(inputValue);
    
    // Update user preferences and conversation memory
    updateUserPreferences(inputValue, contextUpdate);
    
    setUserState(prev => ({
      ...prev,
      ...contextUpdate,
      conversationContext: [...prev.conversationContext, inputValue]
    }));

    // Check if user is responding to a previous question
    const questionResponse = detectQuestionResponse(inputValue, messages);
    if (questionResponse) {
      setIsTyping(true);
      const responseMessage = await handleQuestionResponse(questionResponse, inputValue, contextUpdate);
      setMessages(prev => [...prev, responseMessage]);
      
      // Update conversation memory
      updateConversationMemory(inputValue, responseMessage.text, contextUpdate);
      
      setIsTyping(false);
      setInputValue('');
      return;
    }

    // Check if user wants to take assessment for someone else
    if (isAssessmentForOthers(inputValue)) {
      setIsTyping(true);
      const caregiverMessage = {
        id: Date.now() + 1,
        text: `That's wonderful that you're looking out for ${contextUpdate.careRecipientName || 'someone you care about'}${contextUpdate.userName ? `, ${contextUpdate.userName}` : ''}! Taking an assessment on behalf of a family member or loved one shows how much you care about their health.`,
        sender: 'bot',
        timestamp: new Date(),
        quickOptions: ["Take assessment for them", "Learn about caregiver resources", "Tell me more about their health"]
      };
      setMessages(prev => [...prev, caregiverMessage]);
      setIsTyping(false);
      setInputValue('');
      return;
    }

    // Check if user wants to take assessment
    if (shouldRouteToAssessment(inputValue)) {
      setIsTyping(true);
      
      // Determine context for routing message
      const isForOthers = contextUpdate.assessmentType === 'caregiver' || contextUpdate.careRecipientName;
      const recipientName = contextUpdate.careRecipientName;
      
      // First message - announce the routing
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Excellent!${contextUpdate.userName ? ` ${contextUpdate.userName}, ` : ' '}I'll take you to our risk assessment page where you can get a ${isForOthers ? `personalized evaluation for ${recipientName || 'your loved one'}` : 'personalized evaluation'}.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: isForOthers ? 
            `Taking you there now... The assessment will help us understand ${recipientName ? `${recipientName}'s` : 'their'} specific situation and provide tailored recommendations for their care.` :
            "Taking you there now... The assessment will help us understand your specific situation and provide tailored recommendations.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to assessment page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            console.log('Chatbot: Attempting to navigate to risk-assessment page');
            onNavigate('risk-assessment');
            // Scroll to the assessment selection section
            setTimeout(() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          } else {
            console.error('Chatbot: onNavigate function not available');
          }
        }, 3000);
      }, 2000);
      
      setInputValue('');
      return;
    }

    // Check if user is asking about programs using semantic search
    const programKeywords = ['program', 'class', 'course', 'prevention', 'diabetes', 'hybrid', 'virtual', 'in-person', 'online', 'help me find', 'looking for', 'need', 'want', 'find', 'search', 'show me'];
    const isAboutPrograms = programKeywords.some(keyword => inputValue.toLowerCase().includes(keyword));
    
    // Also check if user clicked a format-specific quick option
    const formatQuickOptions = ['virtual programs', 'in-person programs', 'hybrid programs', 'online programs'];
    const isFormatQuickOption = formatQuickOptions.some(option => inputValue.toLowerCase().includes(option.toLowerCase()));
    
    console.log('Program detection - input:', inputValue);
    console.log('Program detection - isAboutPrograms:', isAboutPrograms);
    console.log('Program detection - isFormatQuickOption:', isFormatQuickOption);
    
    if (isAboutPrograms || isFormatQuickOption) {
      console.log('Chatbot Debug: Detected program-related query, using semantic search');
      setIsTyping(true);
      
      // First try to detect if user has specified a format preference
      const requestedDeliveryMode = detectDeliveryModeRequest(inputValue);
      if (requestedDeliveryMode) {
        try {
          const programs = await searchProgramsByDeliveryMode(requestedDeliveryMode);
          if (programs.length > 0) {
            let responseText = `I found ${programs.length} ${requestedDeliveryMode} program${programs.length > 1 ? 's' : ''} for you:\n\n`;
            
            // Show first 3 programs
            const programsToShow = programs.slice(0, 3);
            programsToShow.forEach((program, index) => {
              responseText += `${index + 1}. **${program.organization_name}**\n`;
              responseText += `📍 ${program.city}, ${program.state}\n`;
              if (program.cost) responseText += `💰 Cost: $${program.cost}\n`;
              if (program.duration_weeks) responseText += `📅 Duration: ${program.duration_weeks} weeks\n`;
              responseText += `\n`;
            });
            
            responseText += `Would you like more details about any of these programs?`;
            
            const responseMessage = {
              id: Date.now() + 1,
              text: responseText,
              sender: 'bot',
              timestamp: new Date(),
              quickOptions: ["Tell me more about these programs", "Find programs in my area", "Compare with other formats"]
            };
            setMessages(prev => [...prev, responseMessage]);
            setIsTyping(false);
            setInputValue('');
            return;
          }
        } catch (error) {
          console.error('Direct delivery mode search failed:', error);
        }
      }
      
      try {
        // Use semantic search with conversation context
        const conversationContext = userState.conversationContext || [];
        const searchResult = await performSemanticSearch(inputValue, conversationContext);
        
        if (searchResult && searchResult.results && searchResult.results.length > 0) {
          const programs = searchResult.results;
          const intentAnalysis = searchResult.intent_analysis;
          
          // Show up to 3 most relevant programs
          const programsToShow = programs.slice(0, 3);
          let responseText = `I found some great programs that match what you're looking for:\n\n`;
          
          programsToShow.forEach((program, index) => {
            responseText += `${index + 1}. **${program.organization_name}**\n`;
            responseText += `📍 ${program.city}, ${program.state}\n`;
            if (program.delivery_mode) responseText += `🏥 Format: ${program.delivery_mode}\n`;
            if (program.cost) responseText += `💰 Cost: $${program.cost}\n`;
            if (program.duration_weeks) responseText += `📅 Duration: ${program.duration_weeks} weeks\n`;
            if (program.similarity) responseText += `🎯 Match score: ${Math.round(program.similarity * 100)}%\n`;
            responseText += `\n`;
          });
          
          // Add intelligent follow-up questions based on intent analysis
          if (intentAnalysis && intentAnalysis.questions_to_ask && intentAnalysis.questions_to_ask.length > 0) {
            const followUpQuestion = intentAnalysis.questions_to_ask[0];
            responseText += `To help me find the perfect program for you: ${followUpQuestion}`;
          } else {
            responseText += `Would you like more details about any of these programs, or shall I help you narrow down the options?`;
          }
          
          // Generate smart quick options based on the search results
          let quickOptions = ["Tell me more about these programs", "Help me choose"];
          
          // Add context-specific options
          const deliveryModes = [...new Set(programs.map(p => p.delivery_mode).filter(Boolean))];
          if (deliveryModes.length > 1) {
            quickOptions.push(`Compare ${deliveryModes.join(' vs ')}`);
          }
          
          const locations = [...new Set(programs.map(p => p.city).filter(Boolean))];
          if (locations.length > 1) {
            quickOptions.push("Filter by location");
          }
          
          quickOptions.push("Take risk assessment");
          
          const responseMessage = {
            id: Date.now() + 1,
            text: responseText,
            sender: 'bot',
            timestamp: new Date(),
            quickOptions: quickOptions.slice(0, 4) // Limit to 4 options
          };
          setMessages(prev => [...prev, responseMessage]);
          
        } else {
          // Fallback to delivery mode search if semantic search fails
          const requestedDeliveryMode = detectDeliveryModeRequest(inputValue);
          if (requestedDeliveryMode) {
            const programs = await searchProgramsByDeliveryMode(requestedDeliveryMode);
            if (programs.length > 0) {
              let responseText = `I found ${programs.length} ${requestedDeliveryMode} program${programs.length > 1 ? 's' : ''} for you. Let me ask a few questions to find the best match:\n\n`;
              responseText += `What's most important to you in a prevention program?`;
              
              const responseMessage = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'bot',
                timestamp: new Date(),
                quickOptions: ["Cost is important", "Convenient location", "Flexible schedule", "Small class size"]
              };
              setMessages(prev => [...prev, responseMessage]);
            } else {
              throw new Error('No programs found');
            }
          } else {
            throw new Error('No relevant programs found');
          }
        }
        
      } catch (error) {
        console.error('Error in semantic search:', error);
        
        // Try direct delivery mode search as fallback
        const requestedDeliveryMode = detectDeliveryModeRequest(inputValue);
        if (requestedDeliveryMode) {
          try {
            const programs = await searchProgramsByDeliveryMode(requestedDeliveryMode);
            if (programs.length > 0) {
              let responseText = `I found ${programs.length} ${requestedDeliveryMode} program${programs.length > 1 ? 's' : ''} for you:\n\n`;
              
              // Show first 3 programs
              const programsToShow = programs.slice(0, 3);
              programsToShow.forEach((program, index) => {
                responseText += `${index + 1}. **${program.organization_name}**\n`;
                responseText += `📍 ${program.city}, ${program.state}\n`;
                if (program.cost) responseText += `💰 Cost: $${program.cost}\n`;
                if (program.duration_weeks) responseText += `📅 Duration: ${program.duration_weeks} weeks\n`;
                responseText += `\n`;
              });
              
              responseText += `Would you like more details about any of these programs?`;
              
              const responseMessage = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'bot',
                timestamp: new Date(),
                quickOptions: ["Tell me more about these programs", "Find programs in my area", "Compare with other formats"]
              };
              setMessages(prev => [...prev, responseMessage]);
              setIsTyping(false);
              setInputValue('');
              return;
            }
          } catch (fallbackError) {
            console.error('Fallback search also failed:', fallbackError);
          }
        }
        
        // Final fallback - check if format preference has already been set to avoid asking again
        let errorMessage;
        if (conversationMemory.formatPreferenceSet) {
          errorMessage = {
            id: Date.now() + 1,
            text: "I'm having trouble finding programs right now, but I'd love to help! Can you tell me more about what you're looking for?",
            sender: 'bot',
            timestamp: new Date(),
            quickOptions: ["Search all programs", "Tell me about programs", "Take risk assessment", "I'm not sure"]
          };
        } else {
          errorMessage = {
            id: Date.now() + 1,
            text: "I'm having trouble finding programs right now, but I'd love to help! Can you tell me more about what you're looking for? For example, do you prefer in-person, virtual, or hybrid programs?",
            sender: 'bot',
            timestamp: new Date(),
            quickOptions: ["in-person programs", "virtual programs", "hybrid programs", "I'm not sure"]
          };
        }
        setMessages(prev => [...prev, errorMessage]);
      }
      
      setIsTyping(false);
      setInputValue('');
      return;
    }

    // Check if user is asking about specific programs by name
    if (shouldSearchPrograms(inputValue)) {
      setIsTyping(true);
      
      // Extract search term from user input
      let searchTerm = inputValue.toLowerCase()
        .replace(/tell me about|more about|information about|details about|what is|describe|explain/g, '')
        .replace(/program|center|clinic|hospital|organization/g, '')
        .trim();
      
      // If user mentions LCI specifically, search for community health centers
      if (inputValue.toLowerCase().includes('lci')) {
        searchTerm = 'community health center';
      }
      
      try {
        const programs = await searchProgramsFromDatabase(searchTerm);
        
        if (programs.length > 0) {
          // Show the first program found
          const program = programs[0];
          const programInfo = formatProgramInfo(program);
          
          const responseMessage = {
            id: Date.now() + 1,
            text: `Here's information about ${program.organization_name}:\n\n${programInfo}`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, responseMessage]);
          
          // If multiple programs found, mention them
          if (programs.length > 1) {
            setTimeout(() => {
              const additionalMessage = {
                id: Date.now() + 2,
                text: `I found ${programs.length} programs matching your search. Would you like information about the other programs, or would you like to search for programs in a specific location?`,
                sender: 'bot',
                timestamp: new Date()
              };
              setMessages(prev => [...prev, additionalMessage]);
            }, 1000);
          }
        } else {
          const noResultsMessage = {
            id: Date.now() + 1,
            text: `I couldn't find any programs matching "${searchTerm}". Would you like me to help you search for programs in your area instead? I can help you find CDC-recognized diabetes prevention programs.`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, noResultsMessage]);
        }
        
      } catch (error) {
        console.error('Error searching programs:', error);
        const errorMessage = {
          id: Date.now() + 1,
          text: "I'm having trouble accessing the program database right now. Let me take you to our programs page where you can search directly.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      
      setIsTyping(false);
      setInputValue('');
      return;
    }

    // Check if user wants to find programs
    if (shouldRouteToPrograms(inputValue)) {
      setIsTyping(true);
      
      // First message - announce the routing
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Great idea${contextUpdate.userName ? `, ${contextUpdate.userName}` : ''}! I'll take you to our lifestyle change programs page where you can find CDC-recognized programs in your area.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: "Taking you there now... You'll be able to search for programs by location and choose between in-person, virtual, or on-demand options.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to programs page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            console.log('Chatbot: Attempting to navigate to lifestyle-programs page');
            onNavigate('lifestyle-programs');
            // Scroll to top for programs page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          } else {
            console.error('Chatbot: onNavigate function not available for programs');
          }
        }, 3000);
      }, 2000);
      
      setInputValue('');
      return;
    }

    // Check if user is asking about risk (provide guidance instead of immediate routing)
    if (isRiskInquiry(inputValue)) {
      setIsTyping(true);
      const riskGuidanceMessage = {
        id: Date.now() + 1,
        text: `That's a great question${contextUpdate.userName ? `, ${contextUpdate.userName}` : ''}! Understanding your personal risk factors is important. I'd recommend taking our risk assessment to get personalized insights. Would you like to get started?`,
        sender: 'bot',
        timestamp: new Date(),
        quickOptions: ["Answer some questions", "Learn more about diabetes", "Tell me about prevention"]
      };
      setMessages(prev => [...prev, riskGuidanceMessage]);
      setIsTyping(false);
      setInputValue('');
      return;
    }

    setInputValue('');
    setIsTyping(true);

    // Get AI response with context
    try {
      const botResponseText = await getBotResponse(inputValue, contextUpdate);
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Update conversation memory with the bot response
      updateConversationMemory(inputValue, botResponseText, contextUpdate);
      
      setIsTyping(false);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try asking your question again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

  const getBotResponse = async (userInput, contextUpdate = null) => {
    try {
      // Build comprehensive personalized context
      const currentState = contextUpdate || userState;
      const conversationSummary = generateConversationSummary();
      
      const personalContext = [];
      
      if (currentState.userName) {
        personalContext.push(`User's name: ${currentState.userName}`);
      }
      if (currentState.careRecipientName) {
        personalContext.push(`Care recipient: ${currentState.careRecipientName}`);
      }
      if (currentState.assessmentType) {
        personalContext.push(`Assessment context: ${currentState.assessmentType}`);
      }

      // Add conversation memory context
      if (conversationMemory.keyTopics.length > 0) {
        personalContext.push(`Previous topics: ${conversationMemory.keyTopics.slice(0, 5).join(', ')}`);
      }
      
      if (conversationMemory.userGoals.length > 0) {
        personalContext.push(`User goals: ${conversationMemory.userGoals.slice(0, 3).join('; ')}`);
      }

      if (userState.userPreferences.preferredProgramType) {
        personalContext.push(`Program preference: ${userState.userPreferences.preferredProgramType}`);
      }

      if (conversationMemory.previousRecommendations.length > 0) {
        personalContext.push(`Previous recommendations: ${conversationMemory.previousRecommendations.slice(-2).join('; ')}`);
      }

      // Add recent conversation context
      const recentMessages = messages.slice(-6).map(msg => 
        `${msg.sender}: ${msg.text.substring(0, 100)}${msg.text.length > 100 ? '...' : ''}`
      ).join(' | ');

      const contextString = personalContext.length > 0 ? 
        `\n\nPersonal Context: ${personalContext.join(', ')}` : '';
      
      const conversationContextString = recentMessages ? 
        `\n\nRecent Conversation: ${recentMessages}` : '';
      
      const summaryString = conversationSummary ? 
        `\n\nConversation Summary: ${conversationSummary}` : '';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a Chronic Disease Prevention Assistant for the CDC: Path2Prevention program. You help people learn about preventing chronic diseases including diabetes, heart disease, stroke, COPD, and obesity.${contextString}${conversationContextString}${summaryString}

Key guidelines:
- Provide evidence-based health information
- Keep responses concise and helpful (2-3 sentences max)
- Utilize plain language and avoid using jargon
- Always suggest taking risk assessment when appropriate
- Mention lifestyle changes like diet, exercise, and avoiding tobacco
- Be encouraging and supportive
- If asked about medical advice, remind users to consult healthcare providers
- Focus on prevention strategies and CDC resources
- Use a professional but friendly tone appropriate for a government health website
- If you know the user's name, use it occasionally to personalize the conversation
- Be attentive to whether they're asking for themselves, someone they care about, or just general information
- When someone wants to take an assessment for a family member or loved one, acknowledge their caring role and provide caregiver-focused guidance
- Use names of care recipients when known (e.g., "Sarah's health", "your mom's risk factors")
- Be supportive of caregivers and recognize the challenges of advocating for someone else's health
- IMPORTANT: Reference previous conversation topics and user preferences when relevant to show continuity
- Avoid repeating the same recommendations if they were already discussed
- Build upon previous conversations and show that you remember what was discussed
- If the user has expressed specific goals or interests, tailor your responses accordingly

Available resources to mention:
- The risk assessment on this website for various chronic diseases
- Local lifestyle change programs (CDC-recognized programs that reduce diabetes risk by 58%)
- Educational videos and interactive tools
- CDC prevention guidelines and recommendations
- In-person, hybrid,virtual, and on-demand program options`
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fallback to basic responses if API fails
      const input = userInput.toLowerCase();
      
      if (input.includes('diabetes')) {
        return "I can help you learn about diabetes prevention. Key steps include maintaining a healthy weight, eating a balanced diet, and staying physically active. Would you like to take our risk assessment to get personalized recommendations?";
      }
      if (input.includes('heart')) {
        return "Heart disease is preventable through lifestyle changes like regular exercise, healthy eating, not smoking, and managing stress. Are you interested in learning about specific prevention strategies or finding a program to help?";
      }
      if (input.includes('risk') || input.includes('assessment')) {
        return "Our risk assessment can help identify your personal risk factors for chronic diseases. It takes just a few minutes and provides personalized recommendations. Would you like to get started with the assessment?";
      }
      if (input.includes('hybrid') || input.includes('in-person') || input.includes('virtual') || input.includes('online')) {
        return "I understand you're interested in programs. Let me help you find the right format. What type of program would work best for you - in-person, virtual, or hybrid?";
      }
      if (input.includes('program') || input.includes('classes')) {
        return "We have CDC-recognized diabetes prevention programs available in various formats: in-person, virtual live sessions, and hybrid options. Would you like me to help you find programs in your area, or do you have questions about what these programs include?";
      }
      if (input.includes('cost') || input.includes('afford') || input.includes('expensive')) {
        return "I understand cost is an important consideration. We have programs at various price points, including free options. Are you looking for low-cost or free programs specifically?";
      }
      if (input.includes('location') || input.includes('near me') || input.includes('area')) {
        return "Location is definitely important for finding the right program. What area are you located in, or would you prefer virtual programs that you can access from anywhere?";
      }
      
      return "I'm here to help with chronic disease prevention information. You can ask me about diabetes, heart disease, stroke and obesity prevention strategies, or help you find prevention programs.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Am I at risk for diabetes?",
    "Heart disease prevention", 
    "Take the risk assessment",
    "Find a program"
  ];

  const handleQuickAction = async (action) => {
    const userMessage = {
      id: Date.now(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if this action is caregiver-specific
    if (action === "Take assessment for them") {
      setIsTyping(true);
      
      // First message - announce the routing for caregiver
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Perfect! I'll take you to our risk assessment page where you can complete an evaluation for ${userState.careRecipientName || 'your loved one'}.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: `Navigating to the assessment now... This will help create a prevention plan tailored for ${userState.careRecipientName ? `${userState.careRecipientName}'s` : 'their'} specific needs.`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to assessment page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('risk-assessment');
            // Scroll to the assessment selection section
            setTimeout(() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }, 3000);
      }, 2000);
      return;
    }

    // Check if this action should route to programs
    if (shouldRouteToPrograms(action)) {
      setIsTyping(true);
      
      // First message - announce the routing to programs
      const routingMessage1 = {
        id: Date.now() + 1,
        text: "Perfect! I'll take you to our lifestyle change programs page where you can find CDC-recognized programs in your area.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: "Taking you there now... You'll find programs available in-person, virtually, or on-demand to fit your schedule and preferences.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to programs page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('lifestyle-programs');
            // Scroll to top for programs page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }
        }, 3000);
      }, 2000);
      return;
    }

    // Check if this action should route to assessment
    if (shouldRouteToAssessment(action)) {
      setIsTyping(true);
      
      // Determine context for routing message
      const isForOthers = userState.assessmentType === 'caregiver' || userState.careRecipientName;
      const recipientName = userState.careRecipientName;
      
      // First message - announce the routing
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Perfect! Let me take you to our risk assessment page where you can get a ${isForOthers ? `personalized evaluation for ${recipientName || 'your loved one'}` : 'personalized evaluation'}.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: isForOthers ? 
            `Navigating to the assessment now... This will help create a prevention plan tailored for ${recipientName ? `${recipientName}'s` : 'their'} specific needs.` :
            "Navigating to the assessment now... This will help us create a prevention plan tailored just for you!",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to assessment page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('risk-assessment');
            // Scroll to the assessment selection section
            setTimeout(() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }, 3000);
      }, 2000);
      return;
    }

    setIsTyping(true);

    try {
      const botResponseText = await getBotResponse(action);
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Update conversation memory for quick actions too
      updateConversationMemory(action, botResponseText, {});
      updateUserPreferences(action, {});
      
      setIsTyping(false);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try asking your question again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '0' : '100px',
          right: isMobile ? '0' : '20px',
          left: isMobile ? '0' : 'auto',
          width: isMobile ? '100%' : '350px',
          height: isMobile ? '100vh' : '500px',
          backgroundColor: 'white',
          borderRadius: isMobile ? '0' : '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: 'var(--mood-dark-navy)',
            color: 'white',
            padding: '16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'white' }}>
                Prevention Assistant
              </h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, color: 'white' }}>
                {userState.userName ? `Hi ${userState.userName}! ` : ''}Ask me about chronic disease prevention
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    backgroundColor: message.sender === 'user' ? 'var(--mood-dark-navy)' : '#f1f5f9',
                    color: message.sender === 'user' ? 'white' : '#334155',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    maxWidth: '80%',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    wordWrap: 'break-word'
                  }}>
                    {renderFormattedText(message.text)}
                  </div>
                </div>
                {/* Quick Options for this message */}
                {message.quickOptions && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginTop: '8px',
                    marginLeft: '8px'
                  }}>
                    {message.quickOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(option)}
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '15px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          color: '#475569',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          alignSelf: 'flex-start'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#cbd5e1';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.borderColor = '#e2e8f0';
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Typing...
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages.length === 1 && !isTyping && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '8px'
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Quick suggestions:
                </p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: '#475569',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.borderColor = '#cbd5e1';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about prevention..."
                style={{
                  flex: 1,
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  resize: 'none',
                  minHeight: '20px',
                  maxHeight: '80px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                style={{
                  backgroundColor: inputValue.trim() ? 'var(--mood-dark-navy)' : '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: 'var(--mood-dark-navy)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          zIndex: 1001,
          transition: 'all 0.2s ease',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
        onMouseOver={(e) => {
          if (!isOpen) {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.filter = 'brightness(1.1)';
          }
        }}
        onMouseOut={(e) => {
          if (!isOpen) {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1)';
          }
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </button>
    </>
  );
};

export default Chatbot;
