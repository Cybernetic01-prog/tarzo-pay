import { motion } from 'framer-motion';
import { 
  Wallet, 
  Globe, 
  Smartphone, 
  Shield, 
  ArrowRight, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  ChevronRight,
  Bell,
  Menu,
  CreditCard,
  History,
  Settings,
  LogOut,
  X,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Lock
} from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Types ---

type AppState = 'ONBOARDING' | 'AUTH' | 'DASHBOARD';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'incoming' | 'outgoing';
  category: string;
  date: string;
  status: 'Success' | 'Pending';
}

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 font-lexend font-bold text-2xl tracking-tighter text-primary">
    <span>Tazro</span>
  </div>
);

const Onboarding = ({ onFinish }: { onFinish: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Global transfers made simple.",
      description: "Experience global transfers at your fingertips. Move money across borders instantly with Tazro's multi-currency wallet.",
      icon: <Globe className="w-16 h-16 text-primary" />,
      color: "bg-primary/5 dark:bg-primary/20"
    },
    {
      title: "Seamless Multi-Currency.",
      description: "Hold, exchange, and send in $, £, €, ¥ and more. Always with the real exchange rate and zero hidden fees.",
      icon: <Wallet className="w-16 h-16 text-primary" />,
      color: "bg-primary/5 dark:bg-primary/20"
    },
    {
      title: "Control Bill Payments.",
      description: "Manage all your subscriptions and utilities in one place. Never miss a due date again with intelligent alerts.",
      icon: <Smartphone className="w-16 h-16 text-primary" />,
      color: "bg-primary/5 dark:bg-primary/20"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-bg overflow-hidden transition-colors">
      <div className="w-full max-w-md relative">
        <div className="flex justify-center mb-12">
          <Logo />
        </div>

        <div className="relative h-[500px] border border-gray-50 dark:border-dark-border rounded-[24px] p-10 bg-white dark:bg-dark-card shadow-sm overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 0.95,
                display: currentSlide === index ? 'flex' : 'none'
              }}
              className="h-full flex flex-col"
            >
              <div className="mb-8">
                <div className="text-primary font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">Onboarding • {index + 1}/3</div>
                <h2 className="text-3xl font-semibold leading-tight mb-4 dark:text-white">{slide.title}</h2>
                <p className="text-gray-400 font-light leading-relaxed">
                  {slide.description}
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center">
                 <div className={`w-48 h-48 ${slide.color} rounded-full flex items-center justify-center`}>
                   <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                   >
                     {slide.icon}
                   </motion.div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 px-4">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="w-14 h-14 bg-primary text-white rounded-[24px] flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Auth = ({ onLogin, toggleTheme, isDarkMode }: { onLogin: () => void, toggleTheme: () => void, isDarkMode: boolean }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-dark-bg flex flex-col items-center justify-center p-6 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-dark-card p-10 rounded-[24px] shadow-sm border border-gray-100 dark:border-dark-border relative"
      >
        <button 
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 bg-gray-50 dark:bg-dark-bg rounded-lg text-gray-500 transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        <div className="flex bg-gray-50 dark:bg-dark-bg p-1 rounded-full mb-8 border border-gray-100 dark:border-dark-border">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-medium rounded-full transition-all ${isLogin ? 'bg-white dark:bg-dark-card shadow-sm text-primary' : 'text-gray-400 font-normal'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-medium rounded-full transition-all ${!isLogin ? 'bg-white dark:bg-dark-card shadow-sm text-primary' : 'text-gray-400 font-normal'}`}
          >
            Get Started
          </button>
        </div>

        <div className="space-y-5">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full p-4 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-[24px] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-gray-300 dark:text-white"
              />
            </motion.div>
          )}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              className="w-full p-4 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-[24px] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-gray-300 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-[24px] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-gray-300 dark:text-white"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full bg-primary text-white py-4 rounded-[24px] font-semibold mt-10 hover:bg-primary-light transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          {isLogin ? 'Sign In to Tazro' : 'Create Live Account'}
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-semibold ml-1 hover:underline underline-offset-4"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>

        <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-3">
          <Shield className="w-4 h-4 text-primary opacity-40" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">256-bit safe encryption</span>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessModal = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-[32px] p-10 max-w-sm w-full text-center shadow-2xl"
    >
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Shield className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="text-2xl font-lexend font-bold mb-2">Success!</h3>
      <p className="text-gray-500 mb-8">{message}</p>
      <button 
        onClick={onClose}
        className="w-full bg-primary text-white py-4 rounded-[24px] font-semibold hover:bg-primary-light transition-all shadow-lg shadow-primary/10"
      >
        Dismiss
      </button>
    </motion.div>
  </div>
);

const SendModal = ({ onClose, onSend }: { onClose: () => void, onSend: (amt: string) => void }) => {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'AMOUNT' | 'PIN'>('AMOUNT');
  const [pin, setPin] = useState('');

  const handleNext = () => {
    if (step === 'AMOUNT') setStep('PIN');
    else {
      if (pin.length === 4) onSend(amount);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-dark-card rounded-[32px] p-10 max-w-md w-full shadow-2xl relative border border-gray-50 dark:border-dark-border"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
            <Lock className="w-3 h-3" /> Secure Transaction
          </div>
          <h3 className="text-2xl font-lexend font-bold dark:text-white">
            {step === 'AMOUNT' ? 'Transfer Funds' : 'Confirm with PIN'}
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            {step === 'AMOUNT' 
              ? 'Enter the amount you would like to transfer to your recipient.' 
              : 'Please enter your 4-digit security PIN to authorize this transfer.'}
          </p>
        </div>
        
        <div className="space-y-6">
          {step === 'AMOUNT' ? (
            <>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Recipient</label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-dark-bg rounded-[20px] border border-gray-100 dark:border-dark-border">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs">JD</div>
                  <input type="email" defaultValue="johndoe@example.com" disabled className="bg-transparent outline-none text-sm dark:text-white flex-1" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Amount to Send</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-2xl">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full p-6 pl-12 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-[24px] outline-none font-bold text-3xl dark:text-white placeholder:text-gray-200" 
                    autoFocus
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 rounded-full border-2 transition-all ${pin.length > i ? 'bg-primary border-primary scale-110' : 'border-gray-200 dark:border-dark-border'}`} 
                  />
                ))}
              </div>
              <input 
                type="password" 
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="opacity-0 absolute h-0 w-0"
                autoFocus
              />
              <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-[240px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'DEL'].map((num, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (num === 'DEL') setPin(pin.slice(0, -1));
                      else if (num !== '' && pin.length < 4) setPin(pin + num);
                    }}
                    className="h-14 rounded-2xl bg-gray-50 dark:bg-dark-bg dark:text-white font-bold hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
                  >
                    {num === 'DEL' ? <X className="w-4 h-4 mx-auto" /> : num}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            disabled={step === 'AMOUNT' ? !amount : pin.length < 4}
            onClick={handleNext}
            className="w-full bg-primary text-white py-5 rounded-[24px] font-bold mt-4 hover:bg-primary-light transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span className="flex items-center justify-center gap-2">
              {step === 'AMOUNT' ? 'Review Transaction' : 'Authorize & Send'} 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

type ModalType = 'NONE' | 'SEND' | 'EXCHANGE' | 'SUCCESS' | 'PAYMENT';

interface PaymentCategory {
  label: string;
  icon: any;
  desc: string;
}

const PaymentProcessModal = ({ category, onClose, onComplete }: { category: PaymentCategory | null, onClose: () => void, onComplete: (msg: string) => void }) => {
  const [step, setStep] = useState<'DETAILS' | 'PIN'>('DETAILS');
  const [pin, setPin] = useState('');
  const [utilityId, setUtilityId] = useState('');
  const [amt, setAmt] = useState('');

  if (!category) return null;

  const handleNext = () => {
    if (step === 'DETAILS') setStep('PIN');
    else {
      if (pin.length === 4) onComplete(`Your ${category.label} payment of $${amt} was successful.`);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-dark-card rounded-[32px] p-10 max-w-md w-full shadow-2xl relative border border-gray-50 dark:border-dark-border"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <div className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Utility Payment</div>
          <h3 className="text-2xl font-lexend font-bold dark:text-white flex items-center gap-3">
            <category.icon className="w-6 h-6 text-primary" />
            {category.label}
          </h3>
        </div>

        <div className="space-y-6">
          {step === 'DETAILS' ? (
            <>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Customer ID / Account Number</label>
                <input 
                  type="text" 
                  value={utilityId}
                  onChange={(e) => setUtilityId(e.target.value)}
                  placeholder="e.g. 1029384756" 
                  className="w-full p-4 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-[20px] outline-none dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Amount to Pay</label>
                <input 
                  type="number" 
                  value={amt}
                  onChange={(e) => setAmt(e.target.value)}
                  placeholder="0.00" 
                  className="w-full p-4 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-[20px] outline-none font-bold text-xl dark:text-white" 
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-center mb-8">Enter your 4-digit PIN to authorize this payment.</p>
              <div className="flex gap-4 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-4 h-4 rounded-full border-2 ${pin.length > i ? 'bg-primary border-primary' : 'border-gray-200 dark:border-dark-border'}`} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 w-full max-w-[240px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'DEL', 0, 'OK'].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (item === 'DEL') setPin(pin.slice(0, -1));
                      else if (typeof item === 'number' && pin.length < 4) setPin(pin + item);
                      else if (item === 'OK' && pin.length === 4) handleNext();
                    }}
                    className="h-12 rounded-xl bg-gray-50 dark:bg-dark-bg dark:text-white font-bold hover:bg-primary/10 transition-all font-lexend"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            disabled={step === 'DETAILS' ? (!utilityId || !amt) : pin.length < 4}
            onClick={handleNext}
            className="w-full bg-primary text-white py-5 rounded-[24px] font-bold mt-4 hover:bg-primary-light transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {step === 'DETAILS' ? 'Continue' : 'Authorize Payment'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onSignOut, toggleTheme, isDarkMode }: { onSignOut: () => void, toggleTheme: () => void, isDarkMode: boolean }) => {
  const [currency, setCurrency] = useState('USD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [modalType, setModalType] = useState<ModalType>('NONE');
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentCategory | null>(null);
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('All');

  const transactions: Transaction[] = [
    { id: '1', name: 'Apple Services', amount: -14.99, type: 'outgoing', category: 'Subscription', date: 'Oct 24, 2023', status: 'Success' },
    { id: '2', name: 'Starbucks Coffee', amount: -5.50, type: 'outgoing', category: 'Food & Drink', date: 'Oct 23, 2023', status: 'Success' },
    { id: '3', name: 'Salary Deposit', amount: 4200.00, type: 'incoming', category: 'Income', date: 'Oct 20, 2023', status: 'Pending' },
    { id: '4', name: 'Netflix Subscription', amount: -15.99, type: 'outgoing', category: 'Entertainment', date: 'Oct 18, 2023', status: 'Success' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'GBP', symbol: '£' },
    { code: 'EUR', symbol: '€' },
    { code: 'JPY', symbol: '¥' },
  ];

  const currentSymbol = currencies.find(c => c.code === currency)?.symbol || '$';

  const handleAction = (type: 'SEND' | 'EXCHANGE') => {
    setModalType(type);
  };

  const handleConfirmSend = (amt: string) => {
    setModalType('SUCCESS');
    setSuccessMsg(`You successfully sent $${amt} for your transaction.`);
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-dark-bg flex flex-col relative transition-colors">
      {/* Modals */}
      {modalType === 'SEND' && (
        <SendModal onClose={() => setModalType('NONE')} onSend={handleConfirmSend} />
      )}
      {modalType === 'PAYMENT' && (
        <PaymentProcessModal 
          category={selectedPayment} 
          onClose={() => setModalType('NONE')} 
          onComplete={(msg) => {
            setSuccessMsg(msg);
            setModalType('SUCCESS');
          }} 
        />
      )}
      {modalType === 'SUCCESS' && (
        <SuccessModal message={successMsg} onClose={() => setModalType('NONE')} />
      )}
      {modalType === 'EXCHANGE' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-dark-card p-10 rounded-[32px] max-w-sm w-full border border-gray-100 dark:border-dark-border">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Currency Exchange</h3>
            <p className="text-gray-500 mb-8">Currency exchange feature is currently being updated. Check back soon for live market rates!</p>
            <button onClick={() => setModalType('NONE')} className="w-full bg-navy text-white py-4 rounded-[24px]">Got it</button>
          </motion.div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="h-20 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border flex items-center justify-between px-6 lg:px-10 flex-shrink-0 z-30 sticky top-0 transition-colors">
        <div className="flex items-center gap-12">
          <Logo />
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            {['Dashboard', 'Payments', 'Cards', 'History', 'Settings'].map((item) => (
              <button 
                key={item}
                onClick={() => setActiveTab(item)}
                className={`transition-all pb-1 border-b-2 hover:text-navy dark:hover:text-white ${activeTab === item ? 'text-primary border-primary font-semibold' : 'border-transparent font-normal'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 bg-gray-50 dark:bg-dark-bg rounded-full flex items-center justify-center border border-gray-100 dark:border-dark-border text-gray-500 hover:text-primary transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="relative w-10 h-10 bg-white dark:bg-dark-card rounded-full flex items-center justify-center border border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-all hover:scale-110 active:scale-95">
            <Bell className="w-4 h-4 text-gray-500" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full border border-white pulse"></span>
          </button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-primary/20">JD</div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-400"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar (Responsive Overlay) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-dark-card border-r border-gray-100 dark:border-dark-border p-8 flex flex-col transform transition-transform duration-300 md:hidden
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex justify-between items-center mb-12">
            <Logo />
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {['Dashboard', 'Payments', 'Cards', 'History', 'Settings'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-[24px] text-sm font-medium transition-all ${activeTab === item ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {item === 'Dashboard' && <Wallet className="w-5 h-5" />}
                {item === 'Payments' && <ArrowUpRight className="w-5 h-5" />}
                {item === 'Cards' && <CreditCard className="w-5 h-5" />}
                {item === 'History' && <History className="w-5 h-5" />}
                {item === 'Settings' && <Settings className="w-5 h-5" />}
                {item}
              </button>
            ))}
          </nav>
          <div className="pt-8 border-t border-gray-100 dark:border-dark-border">
            <button 
              onClick={onSignOut}
              className="w-full flex items-center gap-4 p-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full min-w-0">
          {activeTab === 'Dashboard' && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Section: Featured / Status */}
              <section className="lg:w-1/3 flex flex-col gap-8">
                <div className="flex-1 bg-white dark:bg-dark-card rounded-[24px] p-8 shadow-sm border border-gray-100 dark:border-dark-border flex flex-col relative overflow-hidden group">
                  <div className="mb-6 relative z-10">
                    <div className="text-primary font-bold text-[10px] uppercase tracking-widest mb-3">Professional Polish</div>
                    <h2 className="text-3xl font-semibold leading-tight pr-10 group-hover:text-primary transition-colors dark:text-white">Global transfers made simple.</h2>
                    <p className="text-gray-400 mt-4 font-light leading-relaxed text-sm">Move money across borders instantly with Tazro's multi-currency secure wallet.</p>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center py-6">
                    <div className="relative">
                      <Globe className="w-24 h-24 text-primary/10 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white dark:bg-dark-bg rounded-full shadow-lg border border-gray-100 dark:border-dark-border flex items-center justify-center">
                           <Plus className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center mt-auto">
                    <div className="w-8 h-1.5 bg-primary rounded-full"></div>
                    <div className="w-2 h-1.5 bg-gray-100 dark:bg-dark-bg rounded-full"></div>
                    <div className="w-2 h-1.5 bg-gray-100 dark:bg-dark-bg rounded-full"></div>
                  </div>
                </div>
              </section>

              {/* Right Section: Active Dashboard Components */}
              <section className="lg:w-2/3 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Balance Card */}
                  <div className="md:col-span-2 bg-primary rounded-[24px] p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20 min-h-[220px]">
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-auto">
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Total Balance</p>
                        <button 
                          onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 w-fit px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all border border-white/10"
                        >
                          <span>{currency}</span>
                          <ChevronRight className="w-3 h-3 rotate-90" />
                        </button>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-lexend opacity-50">{currentSymbol}</span>
                          <h1 className="text-5xl font-semibold tracking-tighter">24,500.00</h1>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-black/5 rounded-full blur-3xl" />
                  </div>

                  {/* Quick Actions List Style */}
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleAction('SEND')}
                      className="flex-1 bg-white dark:bg-dark-card rounded-[24px] border border-gray-100 dark:border-dark-border flex items-center gap-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-bg hover:border-primary/20 transition-all shadow-sm group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-navy dark:text-white">Send</span>
                    </button>
                    <button 
                      onClick={() => handleAction('EXCHANGE')}
                      className="flex-1 bg-white dark:bg-dark-card rounded-[24px] border border-gray-100 dark:border-dark-border flex items-center gap-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-bg hover:border-primary/20 transition-all shadow-sm group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-navy dark:text-white">Exchange</span>
                    </button>
                  </div>
                </div>

                {/* Recent Transactions List with themed items */}
                <div className="flex-1 bg-white dark:bg-dark-card rounded-[24px] p-8 shadow-sm border border-gray-100 dark:border-dark-border flex flex-col min-h-0">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-semibold text-lg dark:text-white">Recent Transactions</h3>
                    <button 
                      onClick={() => setActiveTab('History')}
                      className="text-primary text-sm font-bold hover:underline underline-offset-4"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                    {transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-all border border-transparent hover:border-gray-50 dark:hover:border-dark-border group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-dark-bg flex items-center justify-center text-xl shadow-sm border border-gray-50 dark:border-dark-border group-hover:bg-white dark:group-hover:bg-dark-card transition-colors">
                            {t.name.includes('Apple') ? '🍎' : t.name.includes('Starbucks') ? '☕' : t.type === 'incoming' ? '🏦' : '🎥'}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-navy dark:text-white">{t.name}</p>
                            <p className="text-[10px] uppercase font-bold text-gray-300 tracking-wider mt-0.5">{t.date} • {t.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-sm ${t.type === 'incoming' ? 'text-green-600' : 'text-navy dark:text-white'}`}>
                            {t.type === 'incoming' ? '+' : '-'}{currentSymbol}{Math.abs(t.amount).toLocaleString()}
                          </p>
                          <span className={`inline-block text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded mt-1 ${t.status === 'Success' ? 'text-green-500 bg-green-50' : 'text-orange-400 bg-orange-50'}`}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'Payments' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-xl font-bold dark:text-white mb-6">Bill Payments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: 'Mobile Top-up', icon: Smartphone, desc: 'Instant credit for any provider' },
                    { label: 'Electricity', icon: Bell, desc: 'Pay your utility bills' },
                    { label: 'Internet', icon: Globe, desc: 'Settle broadband fees' },
                    { label: 'Insurance', icon: Shield, desc: 'Health & life premiums' },
                    { label: 'Rent', icon: CreditCard, desc: 'Monthly property payments' },
                    { label: 'Subscriptions', icon: History, desc: 'Manage digital services' },
                  ].map((item) => (
                    <button 
                      key={item.label}
                      onClick={() => {
                        setSelectedPayment(item);
                        setModalType('PAYMENT');
                      }}
                      className="bg-white dark:bg-dark-card p-8 rounded-[32px] border border-gray-100 dark:border-dark-border text-left hover:border-primary/30 transition-all group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-navy dark:text-white mb-2">{item.label}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold dark:text-white mb-6">Saved Beneficiaries</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {[
                    { name: 'Sarah W.', initials: 'SW' },
                    { name: 'Michael K.', initials: 'MK' },
                    { name: 'Alicia B.', initials: 'AB' },
                    { name: 'Robert D.', initials: 'RD' },
                  ].map((b) => (
                    <button key={b.name} className="flex-shrink-0 flex flex-col items-center gap-3 group">
                       <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-bg flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all border border-transparent group-hover:border-primary shadow-sm">
                         {b.initials}
                       </div>
                       <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{b.name}</span>
                    </button>
                  ))}
                  <button className="flex-shrink-0 flex flex-col items-center gap-3 transition-all group">
                     <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary border-2 border-dashed border-primary/30 group-hover:bg-primary/10">
                        <Plus className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-medium text-primary">Add New</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Cards' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <div className="space-y-6">
                <div className="bg-navy rounded-[32px] p-10 h-72 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
                   <div className="flex justify-between items-start relative z-10">
                      <Logo />
                      <CreditCard className="w-8 h-8 opacity-50" />
                   </div>
                   <div className="relative z-10">
                      <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-2">Tazro Platinum</p>
                      <p className="text-2xl font-lexend tracking-widest uppercase">•••• •••• •••• 4291</p>
                   </div>
                   <div className="flex justify-between items-end relative z-10">
                      <div>
                         <p className="text-[10px] opacity-40 uppercase mb-1">Card Holder</p>
                         <p className="font-bold text-sm">Joshua Damilola</p>
                      </div>
                      <div className="flex -space-x-4">
                         <div className="w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm" />
                         <div className="w-8 h-8 rounded-full bg-orange-500/80 backdrop-blur-sm" />
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full translate-x-1/4 -translate-y-1/2 blur-3xl" />
                </div>
                
                <button className="w-full flex items-center justify-center gap-3 p-6 bg-white dark:bg-dark-card border-2 border-dashed border-gray-200 dark:border-dark-border rounded-[32px] text-gray-400 hover:text-primary hover:border-primary transition-all">
                  <Plus className="w-6 h-6" />
                  <span className="font-bold">Request New Card</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-dark-card p-8 rounded-[32px] border border-gray-100 dark:border-dark-border">
                  <h3 className="font-bold mb-6 dark:text-white">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Lock, label: 'View PIN' },
                      { icon: Shield, label: 'Insurance' },
                      { icon: Settings, label: 'Limits' },
                      { icon: History, label: 'Recent' },
                    ].map((act) => (
                      <button key={act.label} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-[24px] flex flex-col items-center gap-2 hover:bg-primary/5 transition-all text-gray-500 hover:text-primary">
                        <act.icon className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{act.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-dark-card p-8 rounded-[32px] border border-gray-100 dark:border-dark-border">
                  <h3 className="font-bold mb-6 dark:text-white">Security Settings</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Freeze Card', active: false },
                      { label: 'International Spend', active: true },
                      { label: 'Online Transactions', active: true },
                      { label: 'Contactless Payments', active: true },
                    ].map((setting) => (
                      <div key={setting.label} className="flex items-center justify-between">
                         <span className="text-gray-500 text-sm">{setting.label}</span>
                         <div className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${setting.active ? 'bg-primary' : 'bg-gray-200 dark:bg-dark-bg'}`}>
                            <div className={`h-4 w-4 bg-white rounded-full transition-transform ${setting.active ? 'translate-x-5' : ''}`} />
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'History' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-card rounded-[32px] border border-gray-100 dark:border-dark-border p-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                 <div>
                    <h3 className="font-bold text-xl dark:text-white">Transaction History</h3>
                    <p className="text-gray-400 text-xs mt-1">Review and manage your past financial activities</p>
                 </div>
                 <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <div className="flex-1 md:w-64 relative">
                      <input 
                        type="text" 
                        placeholder="Search transactions..."
                        value={historySearch}
                        onChange={(e) => setHistorySearch(e.target.value)}
                        className="w-full p-2.5 pl-10 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-full text-xs outline-none focus:border-primary/50 dark:text-white"
                      />
                      <Globe className="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    {['All', 'Income', 'Outcome'].map((filter) => (
                      <button 
                        key={filter} 
                        onClick={() => setHistoryFilter(filter)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${historyFilter === filter ? 'bg-navy text-white' : 'border-gray-100 dark:border-dark-border dark:text-white hover:bg-gray-50'}`}
                      >
                        {filter}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="space-y-1">
                {[...transactions, ...transactions, ...transactions].filter(t => {
                  const matchesSearch = t.name.toLowerCase().includes(historySearch.toLowerCase());
                  const matchesFilter = historyFilter === 'All' || 
                                       (historyFilter === 'Income' && t.type === 'incoming') || 
                                       (historyFilter === 'Outcome' && t.type === 'outgoing');
                  return matchesSearch && matchesFilter;
                }).map((t, idx) => (
                  <div key={idx} className="flex items-center group justify-between p-5 border-b border-gray-50 dark:border-dark-border last:border-0 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-xl transition-all">
                    <div className="flex items-center gap-6">
                       <span className="text-gray-400 text-xs w-16">{t.date}</span>
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-dark-card rounded-full flex items-center justify-center">
                             {t.type === 'incoming' ? <ArrowDownLeft className="w-4 h-4 text-green-500" /> : <ArrowUpRight className="w-4 h-4 text-gray-400" />}
                          </div>
                          <div>
                             <p className="font-bold text-sm text-navy dark:text-white">{t.name}</p>
                             <p className="text-[10px] text-gray-400 uppercase font-bold">{t.category}</p>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={`font-bold ${t.type === 'incoming' ? 'text-green-500' : 'text-navy dark:text-white'}`}>
                         {t.type === 'incoming' ? '+' : '-'}${Math.abs(t.amount)}
                       </p>
                       <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${t.status === 'Success' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
                          {t.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Settings' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-1 space-y-8">
                 <div className="bg-white dark:bg-dark-card p-10 rounded-[32px] border border-gray-100 dark:border-dark-border text-center">
                    <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-6">JD</div>
                    <h3 className="text-xl font-bold dark:text-white">Joshua Damilola</h3>
                    <p className="text-gray-400 text-sm mt-1">@josh_damilola</p>
                    <button className="mt-8 px-6 py-2 border border-primary text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all">
                       Edit Profile
                    </button>
                 </div>

                 <div className="bg-white dark:bg-dark-card p-6 rounded-[32px] border border-gray-100 dark:border-dark-border">
                    <nav className="space-y-1">
                       {['Account', 'Security', 'Notifications', 'Legal', 'Privacy'].map((item) => (
                         <button key={item} className="w-full text-left px-4 py-3 rounded-2xl text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-bg transition-all flex justify-between items-center group">
                            {item}
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                         </button>
                       ))}
                    </nav>
                 </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white dark:bg-dark-card p-10 rounded-[32px] border border-gray-100 dark:border-dark-border">
                    <div className="flex items-center gap-3 mb-10">
                       <Shield className="w-6 h-6 text-primary" />
                       <h3 className="font-bold text-xl dark:text-white">Security Controls</h3>
                    </div>
                    
                    <div className="space-y-10">
                       <div className="flex flex-col gap-6">
                          {[
                            { title: 'Two-Factor Authentication', desc: 'Secure your account with 2FA using your phone', active: true },
                            { title: 'Biometric Login', desc: 'Use FaceID or Fingerprint to access Tazro', active: false },
                            { title: 'Transaction Verification', desc: 'Require PIN for all transfers over $100', active: true },
                          ].map((item) => (
                            <div key={item.title} className="flex items-center justify-between group">
                               <div>
                                  <p className="font-bold text-navy dark:text-white">{item.title}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                               </div>
                               <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.active ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-bg'}`}>
                                  <div className={`h-4 w-4 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-6' : ''}`} />
                               </div>
                            </div>
                          ))}
                       </div>
                       
                       <div className="pt-10 border-t border-gray-50 dark:border-dark-border">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Account Access</p>
                          <button className="flex items-center gap-3 text-red-500 font-bold text-sm hover:underline">
                             <X className="w-4 h-4" />
                             Deactivate Account
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="bg-primary/5 dark:bg-primary/10 p-10 rounded-[32px] border border-primary/10">
                    <h3 className="font-bold dark:text-white mb-4">About Tazro Financial</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                       Tazro is a multi-currency platform built for the modern global citizen. Your security is our top priority, employing military-grade encryption for all transactions.
                    </p>
                    <div className="flex gap-4">
                       <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">v2.4.0 Live</span>
                       <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">PCI-DSS Compliant</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [appState, setAppState] = useState<AppState>('ONBOARDING');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary transition-colors">
      {appState === 'ONBOARDING' && <Onboarding onFinish={() => setAppState('AUTH')} />}
      {appState === 'AUTH' && (
        <Auth 
          onLogin={() => setAppState('DASHBOARD')} 
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
      )}
      {appState === 'DASHBOARD' && (
        <Dashboard 
          onSignOut={() => setAppState('ONBOARDING')} 
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
