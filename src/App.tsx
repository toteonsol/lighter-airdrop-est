import { useState, useEffect } from 'react';
import './App.css';

const SEASON_2_WEEKLY_POINTS = 250_000;
const CURRENT_TOTAL_POINTS = 9_500_000;
const CURRENT_DATE = new Date('2025-11-26');
const TOTAL_TOKEN_SUPPLY = 1_000_000_000;

const FDV_PRESETS = [
  { name: 'Conservative', value: 2, comp: '$2B FDV' },
  { name: 'GMX Style', value: 4, comp: '$4B FDV' },
  { name: 'dYdX/Aster', value: 8, comp: '$8B FDV' },
  { name: 'Hyperliquid', value: 15, comp: '$15B FDV' },
  { name: 'Moon 🌙', value: 25, comp: '$25B FDV' },
];

const ALLOCATION_OPTIONS = [2, 5, 7.5, 10, 15, 20, 25, 30];

function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

function calculateWeeksBetween(startDate: Date, endDate: Date): number {
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.ceil(diffDays / 7));
}

function estimateRank(percentageOfPool: number): string {
  if (percentageOfPool >= 0.5) return 'Top 1';
  if (percentageOfPool >= 0.2) return 'Top 10';
  if (percentageOfPool >= 0.08) return 'Top 100';
  if (percentageOfPool >= 0.04) return 'Top 500';
  if (percentageOfPool >= 0.01) return 'Top 1,000';
  if (percentageOfPool >= 0.005) return 'Top 5,000';
  if (percentageOfPool >= 0.001) return 'Top 10,000';
  return 'Top 50,000+';
}

function App() {
  const [userPoints, setUserPoints] = useState<string>('50000');
  const [tgeDate, setTgeDate] = useState<string>('2026-06-30');
  const [allocationPercent, setAllocationPercent] = useState<number>(10);
  const [fdvBillions, setFdvBillions] = useState<number>(15);
  const [customFdv, setCustomFdv] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number>(3);
  const [showPopup, setShowPopup] = useState(false);

  const points = parseFloat(userPoints.replace(/,/g, '')) || 0;
  const selectedDate = new Date(tgeDate);
  const remainingWeeks = calculateWeeksBetween(CURRENT_DATE, selectedDate);
  const futureEmission = remainingWeeks * SEASON_2_WEEKLY_POINTS;
  const totalPointsAtTGE = CURRENT_TOTAL_POINTS + futureEmission;
  const userPercentage = (points / totalPointsAtTGE) * 100;
  const tokensAllocated = (TOTAL_TOKEN_SUPPLY * allocationPercent) / 100;
  const userTokens = (points / totalPointsAtTGE) * tokensAllocated;
  const tokenPrice = (fdvBillions * 1_000_000_000) / TOTAL_TOKEN_SUPPLY;
  const userValue = userTokens * tokenPrice;
  const valuePer10k = (10_000 / totalPointsAtTGE) * tokensAllocated * tokenPrice;
  const estimatedRank = estimateRank(userPercentage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleUserPointsChange = (value: string) => {
    const cleaned = value.replace(/,/g, '');
    if (/^\d*$/.test(cleaned)) {
      setUserPoints(cleaned ? formatNumber(parseFloat(cleaned)) : '');
    }
  };

  const handleFdvPresetClick = (index: number, value: number) => {
    setSelectedPreset(index);
    setFdvBillions(value);
    setCustomFdv('');
  };

  const handleCustomFdvChange = (value: string) => {
    setCustomFdv(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setFdvBillions(parsed);
      setSelectedPreset(-1);
    }
  };

  const handleJoinClick = () => {
    alert('Use referral code: WEB3WIKIS');
    window.open('https://app.lighter.xyz/?referral=WEB3WIKIS', '_blank');
  };

  const handleShareToX = () => {
    const tweetText = `Just checked my @LighterDEX airdrop estimate! 💎\n\n${formatNumber(Math.round(userTokens))} LIGHTER tokens ≈ $${formatNumber(Math.round(userValue))}\n\nCalculate yours: ${window.location.href}\n\nJoin Lighter: https://app.lighter.xyz/?referral=WEB3WIKIS`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="app-container">
      <div className="grid-background"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>✕</button>
            <div className="popup-content">
              <div className="popup-icon">🚀</div>
              <h3 className="popup-title gradient-text">Follow for More Tools!</h3>
              <p className="popup-text">
                Get updates on new DeFi tools, airdrop calculators, and Web3 resources
              </p>
              <button onClick={() => window.open('https://x.com/web3wikis', '_blank')} className="popup-btn lighter-gradient">
                Follow @web3wikis on X
              </button>
              <button onClick={() => setShowPopup(false)} className="popup-skip">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="content-wrapper">
        <div className="header">
          <div className="logo-section">
            <div className="logo-icon">⚡</div>
            <h1 className="gradient-text main-title">
              LIGHTER AIRDROP ESTIMATOR
            </h1>
          </div>
          <p className="subtitle">
            Calculate your potential allocation from the Lighter Perp DEX airdrop
          </p>
        </div>

        <div className="referral-banner glass-card">
          <div className="referral-content">
            <div className="referral-icon">🎁</div>
            <div className="referral-text">
              <h3 className="referral-title">Haven't joined Lighter yet?</h3>
              <p className="referral-subtitle">JOIN LIGHTER USING MY REF CODE: WEB3WIKIS</p>
            </div>
          </div>
          <button onClick={handleJoinClick} className="join-btn lighter-gradient">
            Join Lighter DEX
          </button>
        </div>

        <div className="grid-container">
          <div className="input-section">
            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon">💰</div>
                <h3 className="card-title">Your Lighter Points</h3>
              </div>
              <input
                type="text"
                value={userPoints}
                onChange={(e) => handleUserPointsChange(e.target.value)}
                placeholder="Enter your points"
                className="input-large"
              />
              <p className="input-hint">
                Check your points on the Lighter dashboard
              </p>
            </div>

            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon">📅</div>
                <h3 className="card-title">Assumed TGE Date</h3>
              </div>
              <input
                type="date"
                value={tgeDate}
                onChange={(e) => setTgeDate(e.target.value)}
                min="2025-11-26"
                max="2030-12-31"
                className="input-date"
              />
              <div className="info-box">
                <div className="info-row">
                  <span className="info-label">Weeks until TGE:</span>
                  <span className="info-value gold">{remainingWeeks} weeks</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Future emission:</span>
                  <span className="info-value">{formatNumber(futureEmission)} pts</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Total at TGE:</span>
                  <span className="info-value gold">{formatNumber(totalPointsAtTGE)} pts</span>
                </div>
              </div>
              <p className="input-hint" style={{ marginTop: '0.75rem' }}>
                Season 2 runs through Nov & Dec 2025 and beyond (250k pts/week)
              </p>
            </div>

            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon">📊</div>
                <h3 className="card-title">Community Allocation</h3>
              </div>
              <div className="allocation-grid">
                {ALLOCATION_OPTIONS.map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setAllocationPercent(percent)}
                    className={allocationPercent === percent ? 'allocation-btn active' : 'allocation-btn'}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <p className="input-hint">
                % of total supply allocated to points holders
              </p>
            </div>

            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon">💵</div>
                <h3 className="card-title">Launch FDV</h3>
              </div>
              <div className="fdv-presets">
                {FDV_PRESETS.map((preset, index) => (
                  <button
                    key={preset.name}
                    onClick={() => handleFdvPresetClick(index, preset.value)}
                    className={selectedPreset === index ? 'fdv-btn active' : 'fdv-btn'}
                  >
                    <span className="fdv-name">{preset.name}</span>
                    <span className="fdv-comp">{preset.comp}</span>
                  </button>
                ))}
              </div>
              <div className="custom-fdv-wrapper">
                <input
                  type="text"
                  value={customFdv}
                  onChange={(e) => handleCustomFdvChange(e.target.value)}
                  placeholder="Custom FDV (billions)"
                  className="input-custom-fdv"
                />
                <span className="fdv-suffix">B</span>
              </div>
            </div>
          </div>

          <div className="results-section">
            <div className="glass-card results-card">
              <div className="results-header">
                <h2 className="gradient-text results-title">YOUR ESTIMATED ALLOCATION</h2>
                <p className="results-subtitle">Based on your inputs</p>
              </div>

              <div className="value-card lighter-gradient">
                <div className="value-icon">💎</div>
                <p className="value-label">ESTIMATED VALUE</p>
                <p className="value-amount">
                  ${formatNumber(Math.round(userValue))}
                </p>
                <div className="value-divider"></div>
                <p className="value-tokens">
                  {formatNumber(Math.round(userTokens))} LIGHTER
                </p>
              </div>

              <div className="stats-grid">
                <div className="glass-card stat-card">
                  <p className="stat-label">Your Share</p>
                  <p className="stat-value gold">
                    {userPercentage.toFixed(4)}%
                  </p>
                </div>
                <div className="glass-card stat-card">
                  <p className="stat-label">Token Price</p>
                  <p className="stat-value gold">
                    ${tokenPrice.toFixed(4)}
                  </p>
                </div>
                <div className="glass-card stat-card">
                  <p className="stat-label">Value per 10k pts</p>
                  <p className="stat-value green">
                    ${formatNumber(Math.round(valuePer10k))}
                  </p>
                </div>
                <div className="glass-card stat-card">
                  <p className="stat-label">Est. Rank</p>
                  <p className="stat-value yellow">
                    ~{estimatedRank}
                  </p>
                </div>
              </div>

              <div className="glass-card leaderboard-card">
                <div className="leaderboard-header">
                  <div className="trophy-icon">🏆</div>
                  <h4 className="leaderboard-title">Leaderboard Position</h4>
                </div>
                <p className="leaderboard-text">
                  {points >= 250_000 && (
                    <span className="rank-badge top10">🏆 LIKELY TOP 10</span>
                  )}
                  {points >= 180_000 && points < 250_000 && (
                    <span className="rank-badge top100">🥇 LIKELY TOP 100</span>
                  )}
                  {points >= 100_000 && points < 180_000 && (
                    <span className="rank-badge strong">🥈 STRONG POSITION</span>
                  )}
                  {points < 100_000 && points > 0 && (
                    <span className="rank-badge keep">Keep farming for better rank!</span>
                  )}
                  <br />
                  <span className="rank-info">Based on current top 100 averaging ~180k-250k points</span>
                </p>
              </div>

              <div className="share-watermark">
                <p className="watermark-text">Created with Lighter Airdrop Estimator by @web3wikis</p>
              </div>
            </div>

            <button onClick={handleShareToX} className="share-btn lighter-gradient">
              🐦 Share on X (Twitter)
            </button>

            <div className="glass-card ethos-card">
              <div className="ethos-content">
                <div className="ethos-header">
                  <div className="ethos-icon">⭐</div>
                  <div>
                    <h4 className="ethos-title">Found this tool helpful?</h4>
                    <p className="ethos-subtitle">Leave a review on Ethos Network</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open('https://app.ethos.network/profile/x/web3wikis', '_blank')}
                  className="ethos-btn"
                >
                  Review @web3wikis
                </button>
              </div>
            </div>

            <div className="glass-card disclaimer-card">
              <div className="disclaimer-icon">⚠️</div>
              <p className="disclaimer-text">
                <span className="disclaimer-warning">DISCLAIMER:</span> This is an estimation tool based on public data and common airdrop heuristics. Nothing is confirmed by the Lighter team. Actual allocations may vary significantly. DYOR.
              </p>
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="footer-text">
            Created by{' '}
            <a 
              href="https://x.com/web3wikis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link gradient-text"
            >
              @web3wikis
            </a>
          </p>
          <p className="footer-subtext">Data as of November 26, 2025 • Season 2 ongoing</p>
        </div>
      </div>
    </div>
  );
}

export default App;
