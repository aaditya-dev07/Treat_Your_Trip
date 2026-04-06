import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm TreatBot. Tell me what kind of trip you're looking for (e.g., 'snow', 'beach', 'mountain', 'culture') and I'll recommend a destination!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim().toLowerCase();
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');

    // Hardcoded logic
    let response = "That sounds lovely! While I don't have a specific recommendation for that exact keyword, you can browse all our amazing destinations in the 'Destinations' tab.";
    
    if (userMsg.includes('snow') || userMsg.includes('ski') || userMsg.includes('winter') || userMsg.includes('cold')) {
      response = "If you love the snow, I highly recommend Switzerland! Check out the 'Swiss Alps Skiing' package or book the Zermatt Peak Resort.";
    } else if (userMsg.includes('beach') || userMsg.includes('ocean') || userMsg.includes('sea') || userMsg.includes('scuba') || userMsg.includes('water')) {
      response = "For an amazing beach or water experience, India is fantastic! We have 'Andaman Scuba Diving' and beautiful resorts like Taj Mahal Palace overlooking the water.";
    } else if (userMsg.includes('mountain') || userMsg.includes('trek') || userMsg.includes('hike') || userMsg.includes('everest')) {
      response = "The majestic mountains of Nepal are calling you. I recommend the 'Everest Base Camp Trek' and hiring a local Nepali guide for the best experience.";
    } else if (userMsg.includes('culture') || userMsg.includes('history') || userMsg.includes('food')) {
      response = "Both India and Nepal offer incredible culture, food, and history. Check out the 'Taj Mahal Palace' in India or 'Kathmandu Boutique Hotel' in Nepal!";
    } else if (userMsg.includes('adventure') || userMsg.includes('thrill') || userMsg.includes('extreme')) {
        response = "We have quite a few adventures! Bungee Jumping in India, Paragliding in Switzerland, or River Rafting in Nepal. Browse the 'Adventure Packages' tab!";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
    }, 600);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px',
            borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer', zIndex: 999
          }}
          className="physics-card"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {isOpen && (
        <div 
          className="glass-panel animate-slide-up"
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', width: '350px', height: '500px',
            display: 'flex', flexDirection: 'column', zIndex: 1000, padding: 0, overflow: 'hidden'
          }}
        >
          <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} />
              <span style={{ fontWeight: 600 }}>TreatBot Guide</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.9)' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ 
                  background: msg.sender === 'user' ? 'var(--primary-color)' : '#e2e8f0',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
                  padding: '0.75rem 1rem', borderRadius: '12px',
                  borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                  borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                  fontSize: '0.9rem', lineHeight: 1.4
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', background: 'white', borderTop: '1px solid #e2e8f0' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a destination..."
              style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '20px', padding: '0.5rem 1rem', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '0.5rem', cursor: 'pointer' }}>
              <Send size={16} style={{ marginLeft: '-2px', marginTop: '2px' }}/>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
