'use client';

import Link from "next/link";
import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { useEffect, useRef, useState } from "react";
import { AudioExperienceProvider } from "@/components/audio-player";
import { CustomAudioPlayer } from "@/components/custom-audio-player";

function getDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const politicalIssues = [
  {
    label: "Inadequate Problem Solving",
    links: [
      { url: "https://www.cidob.org/en/publications/world-2025-ten-issues-will-shape-international-agenda", title: "The world in 2025: ten issues that will shape international agenda" },
      { url: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/06/oecd-economic-outlook-volume-2025-issue-1_1fd979a8/8336338", title: "OECD Economic Outlook, Volume 2025 Issue 1" },
      { url: "https://www.pewresearch.org/2025/05/08/americans-trust-in-one-another/", title: "Americans' Trust in One Another" },
      { url: "https://market-insights.upply.com/en/economic-outlook-2025-moderate-growth-and-increased-tensions", title: "Economic outlook 2025: moderate growth and increased tensions" },
      { url: "https://publichealth.jhu.edu/center-for-health-equity/2025/restoring-trust-in-our-institutions-and-each-other", title: "Restoring Trust in Our Institutions and Each Other" },
    ],
  },
  {
    label: "Political Polarization",
    links: [
      { url: "https://www.wtwco.com/en-ca/news/2025/06/political-polarisation-is-rising-globally-and-posing-new-challenges-for-businesses", title: "Political polarisation is rising globally says Willis report" },
      { url: "https://academic.oup.com/pnasnexus/article/3/10/pgae310/7821173", title: "Affective polarization is uniformly distributed across American state lines" },
      { url: "https://journals.sagepub.com/doi/10.1177/00208345251323534", title: "Trends in Political Science Research: Affective Polarization" },
      { url: "https://www.allianz.com/en/mediacenter/news/media-releases/241118-how-polarization-is-shaping-the-economy.html", title: "Little fires everywhere: How polarization is shaping the economy" },
      { url: "https://www.gu.se/sites/default/files/2025-02/R2025_1.pdf", title: "The electoral rise of affective polarization: also in European democracies" },
    ],
  },
  {
    label: "Erosion of Trust",
    links: [
      { url: "https://www.eurofound.europa.eu/en/commentary-and-analysis/all-content/trust-national-institutions-falling-data-behind-decline", title: "Trust in national institutions is falling: Data behind the decline" },
      { url: "https://www.socialeurope.eu/trust-in-crisis-europes-social-contract-under-threat", title: "Trust in crisis: Europe's social contract under threat" },
      { url: "https://www.who.int/europe/news/item/12-07-2023-widening-inequities--declining-trust---they-are-inextricably-linked--with-signif", title: "Widening inequities, declining trust – they are inextricably linked" },
      { url: "https://www.oecd.org/en/publications/oecd-survey-on-drivers-of-trust-in-public-institutions-2024-results_9a20554b-en.html", title: "OECD Survey on Drivers of Trust in Public Institutions (2024)" },
      { url: "https://www.frontlinebesci.com/p/is-trust-losing-its-grip-and-might", title: "Is trust in government now a relic of the past?" },
    ],
  },
];

const economicIssues = [
  {
    label: "Escalating Layoffs",
    links: [
      { url: "https://www.linkedin.com/pulse/layoffs-getting-ugly-new-data-exposes-2025s-harsh-reality-j1l6e", title: "Layoffs Are Getting Ugly: New Data Exposes 2025's Harsh Reality" },
      { url: "https://www.isemediaagency.com/article/u-s-corporate-layoffs-surge-in-late-2025-amid-economic-slowdown-and-ai-restructuring", title: "U.S. Corporate Layoffs Surge in Late 2025 Amid Economic Slowdown and AI Restructuring" },
      { url: "https://www.forbes.com/sites/jackkelly/2025/05/10/big-layoffs-are-hitting-these-sectors-the-hardest/", title: "Big Layoffs Hit These Sectors Hardest in 2025" },
      { url: "https://intellizence.com/insights/layoff-downsizing/major-companies-that-announced-mass-layoffs/", title: "Companies that announced Major Layoffs and Hiring Freezes" },
      { url: "https://www.reuters.com/business/factbox-us-companies-announce-layoffs-cut-costs-2025-09-25/", title: "US companies step up job cuts amid uncertain economy" },
      { url: "https://www.latimes.com/business/story/2025-10-30/layoffs-are-piling-up-raising-worker-anxiety-here-are-some-companies-that-have", title: "Layoffs are piling up. Here are companies that have cut jobs" },
    ],
  },
  {
    label: "AI Agentification of the Org",
    links: [
      { url: "https://www.bcg.com/publications/2025/how-agentic-ai-is-transforming-enterprise-platforms", title: "How Agentic AI is Transforming Enterprise Platforms" },
      { url: "https://www.klover.ai/how-ai-agents-will-redefine-enterprise-leadership-in-2025/", title: "How AI Agents Will Redefine Enterprise Leadership in 2025" },
      { url: "https://hbr.org/2025/05/agentic-ai-is-already-changing-the-workforce", title: "Agentic AI Is Already Changing the Workforce" },
      { url: "https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality", title: "AI Agents in 2025: Expectations vs. Reality" },
      { url: "https://genesishumanexperience.com/2025/10/19/ai-agent-trends-of-2025-entering-the-agentic-era-of-autonomous-intelligence/", title: "AI Agent Trends of 2025: Entering the Agentic Era of Autonomous Intelligence" },
      { url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai", title: "The State of AI: Global Survey 2025" },
    ],
  },
  {
    label: "Supply Chain Disruptions",
    links: [
      { url: "https://optimizepros.ai/supply-chain/disruption/", title: "Supply Chain Disruptions in 2025" },
      { url: "https://www.xeneta.com/blog/the-biggest-global-supply-chain-risks-of-2025", title: "The Biggest Global Supply Chain Risks of 2025" },
      { url: "https://www.oecd.org/en/about/news/speech-statements/2025/06/2025-oecd-supply-chain-resilience-review-launch.html", title: "2025 OECD Supply Chain Resilience Review Launch" },
      { url: "https://www.achilles.com/industry-insights/supply-chain-risk-hotspots-to-watch-in-2025-and-beyond/", title: "Supply Chain Risk Management: Trends & Strategies 2025" },
      { url: "https://www.maersk.com/insights/resilience/2025/05/02/monitoring-global-risks-in-the-supply-chain", title: "2025 Supply Chains Risks: Monitoring Global Events" },
      { url: "https://market-insights.upply.com/en/economic-outlook-2025-moderate-growth-and-increased-tensions", title: "Economic outlook 2025: moderate growth and increased tensions" },
    ],
  },
  {
    label: "Erosion of Purchasing Power",
    links: [
      { url: "https://discoveryalert.com.au/purchasing-power-2025-economic-well-being-impact/", title: "Understanding the Declining Purchasing Power of the Dollar (2025)" },
      { url: "https://www.clevelandfed.org/publications/economic-commentary/2025/ec-202511-did-inflation-affect-households-differently", title: "Did Inflation Affect Households Differently?" },
      { url: "https://www.jrf.org.uk/cost-of-living/jrfs-cost-of-living-tracker-summer-2025", title: "A year of Labour but no progress: JRF's cost of living tracker (2025)" },
      { url: "https://www.deloitte.com/us/en/insights/industry/consumer-products/consumer-products-industry-outlook.html", title: "2025 Consumer Products Industry Outlook" },
      { url: "https://www.cbo.gov/publication/61738", title: "CBO's Current View of the Economy From 2025 to 2028" },
      { url: "https://onlinelibrary.wiley.com/doi/10.1111/roiw.70009?af=R", title: "Who Suffers the Most From the Cost of Living Crisis?" },
    ],
  },
  {
    label: "Inflation",
    links: [
      { url: "https://www.jpmorgan.com/insights/global-research/economy/global-inflation-forecast", title: "Global Inflation Forecast" },
      { url: "https://www.ifo.de/en/facts/2025-04-09/economic-experts-survey-experts-expect-inflation-rates-rise-worldwide", title: "Economic Experts Survey: Experts Expect Inflation Rates to Rise Worldwide (2025)" },
      { url: "https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025_5345f034/full-report/component-5.html", title: "OECD Employment Outlook 2025: Bouncing back, but on shaky ground" },
      { url: "https://thedocs.worldbank.org/en/doc/8bf0b62ec6bcb886d97295ad930059e9-0050012025/original/GEP-June-2025.pdf", title: "Global Economic Prospects -- June 2025" },
      { url: "https://www.ecb.europa.eu/pub/pdf/ecbu/eb202502.en.pdf", title: "Economic Bulletin Issue 2, 2025 - European Central Bank" },
      { url: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/06/oecd-economic-outlook-volume-2025-issue-1_1fd979a8/8336338", title: "OECD Economic Outlook, Volume 2025 Issue 1" },
    ],
  },
];

const socialIssues = [
  {
    label: "Social media algos",
    links: [
      { url: "https://news.weill.cornell.edu/news/2025/06/study-finds-addictive-screen-use-not-total-screen-time-linked-to-youth-suicide-risk", title: "Study Finds Addictive Screen Use, Not Total Screen Time, Linked to Youth Suicide Risk" },
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11804976/", title: "Social Media Algorithms and Teen Addiction: Neurophysiological Impact and Ethical Considerations" },
      { url: "https://www.who.int/europe/news/item/25-09-2024-teens--screens-and-mental-health", title: "Teens, screens and mental health" },
      { url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5130959", title: "SSRN Paper on Social Media Algorithms" },
    ],
  },
  {
    label: "Breakdown of Community",
    links: [
      { url: "https://www.happiness.hks.harvard.edu/february-2025-issue/the-friendship-recession-the-lost-art-of-connecting", title: "The Friendship Recession: The Lost Art of Connecting" },
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8863664/", title: "Less Social Participation Is Associated With a Higher Risk of Depressive Symptoms Among Chinese Older Adults" },
      { url: "https://demos.co.uk/wp-content/uploads/2025/01/Social-Capital-2025_The-Hidden-Wealth-of-Nations.pdf", title: "Social Capital 2025: The Hidden Wealth of Nations" },
    ],
  },
  {
    label: "Loneliness Epidemic",
    links: [
      { url: "https://www.yellowbusaba.com/post/loneliness-statistics", title: "Loneliness Statistics" },
      { url: "https://www.gov.uk/government/statistics/community-life-survey-202324-annual-publication/community-life-survey-202324-loneliness-and-support-networks--2", title: "Community Life Survey 2023/24: Loneliness and support networks" },
      { url: "https://www.lshtm.ac.uk/newsevents/news/2025/expert-comment-loneliness-impacting-1-6-people-who-report-finds", title: "Expert Comment: Loneliness Impacting 1 in 6 People, WHO Report Finds" },
      { url: "https://www.apa.org/news/press/releases/2025/11/nation-suffering-division-loneliness", title: "Nation Suffering from Division and Loneliness" },
    ],
  },
  {
    label: "Pair-bonding Crisis",
    links: [
      { url: "https://www.nssgclub.com/en/lifestyle/39557/dating-crisis-relationship-recession-gen-z", title: "The Dating Crisis: The Global 'Relationship Recession'" },
      { url: "https://population-europe.eu/research/policy-insights/why-relationship-recession-affects-our-well-being-europe", title: "Why the Relationship Recession Affects our Well-Being in Europe" },
      { url: "https://www.pewresearch.org/short-reads/2025/01/08/share-of-us-adults-living-without-a-romantic-partner-has-ticked-down-in-recent-years/", title: "Share of U.S. adults living without a romantic partner has ticked down in recent years" },
    ],
  },
  {
    label: "Social Division",
    links: [
      { url: "https://academic.oup.com/pnasnexus/article/3/10/pgae310/7821173?login=false", title: "Political Polarization and Social Media" },
      { url: "https://www.allianz.com/en/economic_research/insights/publications/specials_fmo/241118-social-resilience-index.html", title: "Little fires everywhere: How polarization is shaping the economy" },
      { url: "https://www.socialeurope.eu/elections-of-division-can-unity-still-win", title: "Elections of division: Can unity still win?" },
      { url: "https://www.wtwco.com/en-ca/news/2025/06/political-polarisation-is-rising-globally-and-posing-new-challenges-for-businesses", title: "Political polarisation is rising globally and posing new challenges for businesses" },
    ],
  },
  {
    label: "Classism",
    links: [
      { url: "https://www.brookings.edu/articles/rising-inequality-a-major-issue-of-our-time/", title: "Rising inequality: A major issue of our time" },
      { url: "https://ourworldindata.org/global-inequality-opportunity-to-give", title: "Global inequality is huge - but so is the opportunity for people in high-income countries to support poor people" },
      { url: "https://g20.org/track-news/g20-task-force-urges-formation-of-global-panel-to-tackle-inequality-emergency/", title: "G20 Task Force Urges Formation of Global Panel to Tackle Inequality Emergency" },
      { url: "https://wid.world/news-article/statement-on-global-inequality-stiglitz-report/", title: "Statement from the World Inequality Lab on the G20 Report on Global Inequality" },
    ],
  },
];

const techIssues = [
  {
    label: "Privacy & Security",
    links: [
      { url: "https://news.stanford.edu/stories/2025/10/study-exposes-privacy-risks-of-ai-chatbot-conversations", title: "Study exposes privacy risks of AI chatbot conversations" },
      { url: "https://independent.co.uk/tech/smart-devices-personal-data-privacy-b2645127.html", title: "Many smart devices gathering 'excessive' amounts of personal data" },
      { url: "https://statista.com/topics/3168/data-privacy-of-internet-users-worldwide/", title: "Data privacy of internet users worldwide" },
      { url: "https://blog.checkpoint.com/security/cyber-attacks-surge-in-oct-2025-ransomware-leads/", title: "Cyber Attacks Surge in Oct 2025: Ransomware Leads" },
      { url: "https://cybersecuritydive.com/news/cisco-zero-day-threat-actor/733956/", title: "Sophisticated threat actor targeting zero-day flaws in Cisco products" },
      { url: "https://malwarebytes.com/blog/news/2025/11/chrome-zero-day-under-active-attack-visiting-the-wrong-site-can-get-you-hacked", title: "Chrome zero-day under active attack: visiting the wrong site can get you hacked" },
      { url: "https://bbc.com/news/technology-67101011", title: "AI could worsen cyber-threats, report warns" },
      { url: "https://helpnetsecurity.com/2025/11/16/the-year-ahead-in-cyber-whats-next-for-cybersecurity-in-2026/", title: "The year ahead in cyber: What's next for cybersecurity in 2026" },
    ],
  },
  {
    label: "Deepfakes",
    links: [
      { url: "https://cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html", title: "Finance worker pays out $25 million after video call with deepfake 'chief financial officer'" },
      { url: "https://euractiv.com/section/artificial-intelligence/news/irish-election-deepfake-scandal-spotlights-slow-implementation-of-ai-act/", title: "Irish election deepfake scandal spotlights slow implementation of AI Act" },
      { url: "https://reuters.com/technology/artificial-intelligence/un-report-urges-stronger-measures-detect-ai-driven-election-interference-2025-07-11/", title: "UN report urges stronger measures to detect AI-driven election interference" },
      { url: "https://unesco.org/en/articles/deepfakes-and-crisis-knowing", title: "Deepfakes and the crisis of knowing" },
      { url: "https://cnn.com/2025/04/01/tech/tech-experts-warn-ai-worse-humans/index.html", title: "Tech industry experts warn AI will make us worse humans" },
      { url: "https://mxdusa.org/warning-the-ai-deepfake-danger-intensifies/", title: "Warning: The AI Deepfake Danger Intensifies" },
      { url: "https://cetas.turing.ac.uk/news/deepfake-scams-poisoned-chatbots-ai-and-election-interference", title: "From Deepfake Scams to Poisoned Chatbots: AI and Election Interference" },
      { url: "https://weforum.org/stories/2025/06/cybercrime-deepfake-attack-cyber-security/", title: "Cybercrime: Lessons learned from a $25m deepfake attack" },
      { url: "https://weforum.org/stories/2025/07/detecting-dangerous-ai-is-essential-in-the-deepfake-era/", title: "Detecting dangerous AI is essential in the deepfake era" },
    ],
  },
  {
    label: "AI Biases",
    links: [
      { url: "https://bbc.com/news/technology-50865437", title: "Facial recognition fails on race, government study says" },
      { url: "https://forbes.com/sites/bernardmarr/2025/10/27/new-healthcare-study-warns-about-the-hidden-dangers-of-ai-bias/", title: "New Healthcare Study Warns About The Hidden Dangers Of AI Bias" },
      { url: "https://cronkitenews.azpbs.org/2025/10/06/ai-reshapes-healthcare-but-often-adopts-bias/", title: "AI reshapes healthcare but often adopts bias" },
      { url: "https://technologyreview.com/2020/07/17/1005396/predictive-policing-algorithms-racist-dismantled-machine-learning-bias-criminal-justice/", title: "Predictive policing algorithms are racist. They need to be dismantled." },
      { url: "https://amnesty.org.uk/press-releases/police-forces-supercharging-racism-crime-predicting-algorithms", title: "Police forces 'supercharging racism' with crime predicting algorithms" },
      { url: "https://techpolicy.press/ai-bias-is-not-ideological-its-science/", title: "AI bias is not ideological. It's science." },
      { url: "https://jbs.cam.ac.uk/2025/the-dark-side-of-ai-algorithmic-bias-and-global-inequality/", title: "The dark side of AI: algorithmic bias and global inequality" },
      { url: "https://imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity", title: "AI Will Transform the Global Economy. Let's Make Sure It Benefits Humanity." },
    ],
  },
  {
    label: "AI Alignment",
    links: [
      { url: "https://roland-ewald.github.io/2025/04/05/ai-2027.html", title: "AI-2027: a month-by-month prediction for AI development" },
      { url: "https://ai-2027.com/research", title: "AI 2027 – Research" },
      { url: "https://www.sciencedirect.com/science/article/pii/S266638992400103X", title: "AI deception: A survey of examples, risks, and potential solutions" },
      { url: "https://openai.com/index/detecting-and-reducing-scheming-in-ai-models/", title: "Detecting and reducing scheming in AI models" },
      { url: "https://www.apolloresearch.ai/research/stress-testing-deliberative-alignment-for-anti-scheming-training/", title: "Stress Testing Deliberative Alignment for Anti-Scheming Training" },
      { url: "https://www.anthropic.com/research/agentic-misalignment", title: "Agentic Misalignment: How LLMs could be insider threats" },
      { url: "https://arxiv.org/abs/2510.08211", title: "LLMs Learn to Deceive Unintentionally: Emergent Misalignment in Language Models" },
      { url: "https://www.arxiv.org/pdf/2506.21584.pdf", title: "Empirical Evidence for Alignment Faking in a Small LLM" },
    ],
  },
];

const mentalIssues = [
  {
    label: "Loneliness",
    links: [
      { url: "https://mcc.gse.harvard.edu/reports/loneliness-in-america-2024", title: "Loneliness in America: Just the Tip of the Iceberg?" },
      { url: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death", title: "Social connection linked to improved health and reduced risk of early death" },
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12245810/", title: "Combatting the Loneliness Epidemic Through Social Connection" },
      { url: "https://www.tcd.ie/news_events/articles/2025/there-is-no-loneliness-epidemic/", title: "There is no loneliness epidemic" },
      { url: "https://www.nature.com/articles/s41598-025-08842-1", title: "Long term patterns and risk factors of loneliness in young adults" },
    ],
  },
  {
    label: "Depression",
    links: [
      { url: "https://www.nimh.nih.gov/health/statistics/major-depression", title: "Major Depression - National Institute of Mental Health (NIMH)" },
      { url: "https://sph.umich.edu/news/2025posts/college-student-mental-health-third-consecutive-year-improvement.html", title: "Healthy Minds Study: College student depression, anxiety decline for third consecutive year" },
      { url: "https://www.cdc.gov/children-mental-health/data-research/index.html", title: "Data and Statistics on Children's Mental Health" },
      { url: "https://www.nami.org/about-mental-illness/mental-health-by-the-numbers/", title: "Mental Health By the Numbers" },
      { url: "https://ourworldindata.org/mental-health", title: "Mental Health" },
    ],
  },
  {
    label: "Personality disorders",
    links: [
      { url: "https://www.nimh.nih.gov/health/statistics/personality-disorders", title: "Personality Disorders - National Institute of Mental Health" },
      { url: "https://pubmed.ncbi.nlm.nih.gov/31298170/", title: "The prevalence of personality disorders in the community" },
      { url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/481789", title: "The Prevalence of Personality Disorders in a Community Sample" },
      { url: "https://cipp.ug.edu.pl/Cross-cultural-studies-on-the-prevalence-of-personality-disorders,95131,0,2.html", title: "Cross-cultural studies on the prevalence of personality disorders" },
      { url: "https://www.nature.com/articles/s41598-025-08842-1", title: "The global epidemiology of personality disorder" },
    ],
  },
  {
    label: "Neurodivergency",
    links: [
      { url: "https://www.cdc.gov/autism/data-research/index.html", title: "Data and Statistics on Autism Spectrum Disorder" },
      { url: "https://www.autismparentingmagazine.com/autism-statistics/", title: "Autism Statistics You Need To Know in 2024" },
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12335152/", title: "Real-world evaluation of prevalence, cohort characteristics of neurodevelopmental disorders" },
      { url: "https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2024.1402312/full", title: "Co-occurring autism, ADHD, and gender dysphoria" },
      { url: "https://www.thelancet.com/journals/lanchi/article/PIIS2352-4642(24)00261-X/abstract", title: "Addressing multiple neurodivergent identities in clinical practice" },
    ],
  },
  {
    label: "'One size fits all' education",
    links: [
      { url: "https://www.21kschool.com/in/blog/one-size-fits-all-education/", title: "One-Size-Fits-All Education: A Critical Examination" },
      { url: "https://www.whitbyschool.org/passionforlearning/differentiated-learning-why-one-size-fits-all-doesnt-work-in-education", title: "Why \"One Size Fits All\" Doesn't Work In Education" },
      { url: "https://thereader.mitpress.mit.edu/masters-of-none-the-flawed-logic-of-one-size-fits-all-education/", title: "Masters of None: The Flawed Logic of One-Size-Fits-All Education" },
      { url: "https://www.youngfoundation.org/insights/news/one-size-fits-all-education-system-challenged-by-young-people/", title: "One-size-fits all education system challenged by young people" },
      { url: "https://www.sciencedirect.com/science/article/pii/S0742051X23004171", title: "Personalized learning: The simple, the complicated, and the complex" },
    ],
  },
];

const microSocialIssues = [
  {
    label: "Relationship conflicts",
    links: [
      { url: "https://journals.sagepub.com/doi/10.1177/02654075241298165", title: "Mental contrasting and conflict management in satisfied relationships" },
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10333975/", title: "The Role of Relationship Conflict for Momentary Emotional Well-being" },
      { url: "https://journals.kmanpub.com/index.php/jprfc/article/view/521", title: "The Relationship between Emotional Intelligence and Marital Conflicts" },
      { url: "https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Negotiation_and_Conflict_Management/De_Dreu_Weingart_Task-conflict_Meta-analysis_JAP_2003.pdf", title: "Task Versus Relationship Conflict, Team Performance, and Team Member Satisfaction" },
      { url: "https://www.sciencedirect.com/science/article/abs/pii/S0092656625000303", title: "Intellectual humility in romantic relationships: Implications for conflict" },
    ],
  },
  {
    label: "Degradation of social bonds",
    links: [
      { url: "https://www.nature.com/articles/s41562-022-01453-0", title: "Social isolation and the brain in the pandemic era" },
      { url: "https://www.neuroscienceresearchinstitute.com/social-isolation-leads-to-myelin-damage-in-the-brain/", title: "Social Isolation Leads to Myelin Damage in the Brain" },
      { url: "https://seaburylife.org/the-negative-effects-of-social-isolation-for-seniors/", title: "The Negative Effects of Social Isolation for Seniors" },
      { url: "https://pubmed.ncbi.nlm.nih.gov/40281851/", title: "Experiences of Social Isolation in Older Adults with Chronic Disease" },
      { url: "https://journals.sagepub.com/doi/10.1177/13872877241284222", title: "Social isolation and social cognition: A cross-sectional study" },
    ],
  },
  {
    label: "Bullying and crime",
    links: [
      { url: "https://www.cgdev.org/blog/look-new-timss-data-bullying-and-learning", title: "A Look into the New TIMSS Data on Bullying and Learning" },
      { url: "https://nces.ed.gov/whatsnew/press_releases/1_17_2024.asp", title: "New Schools Data Examine Violent Incidents, Bullying, Drug Use" },
      { url: "https://pubmed.ncbi.nlm.nih.gov/40065986", title: "Trends in Indicators of Violence Among Adolescents" },
      { url: "https://www.pacer.org/bullying/info/stats/", title: "Bullying Statistics" },
      { url: "https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/bullyingandonlineexperiencesamongchildreninenglandandwales/yearendingmarch2024", title: "Bullying and online experiences among children in England and Wales" },
    ],
  },
  {
    label: "Covert emotional abuse",
    links: [
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11545147/", title: "Subtle or Covert Abuse Within Intimate Partner Relationships" },
      { url: "https://www.counselling-directory.org.uk/articles/the-insidious-damage-caused-by-covert-emotional-abuse", title: "The insidious damage caused by covert emotional abuse" },
      { url: "https://www.uea.ac.uk/about/news/article/new-research-highlights-the-overlooked-dangers-of-subtle-and-covert-abuse-in-intimate-relationships", title: "New research highlights the overlooked dangers of subtle and covert abuse" },
      { url: "https://journals.sagepub.com/doi/abs/10.1177/15248380241268643", title: "Subtle or Covert Abuse Within Intimate Partner Relationships" },
      { url: "https://www.mentalhealth.org.uk/explore-mental-health/blogs/toxic-shadow-emotional-abuse", title: "The toxic shadow of emotional abuse" },
    ],
  },
];

const physicalIssues = [
  {
    label: "Poor health management",
    links: [
      { url: "https://crownschool.uchicago.edu/student-life/advocates-forum/chronic-disease-management-improving-outcomes-reducing-costs", title: "Chronic Disease Management: Improving Outcomes, Reducing Costs" },
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10830426/", title: "The Burden of Chronic Disease" },
      { url: "https://advances.umw.edu.pl/en/article/2024/33/8/767/", title: "Self-care: An effective strategy to manage chronic diseases" },
      { url: "https://www.cdc.gov/chronic-disease/data-research/facts-stats/index.html", title: "Fast Facts: Health and Economic Costs of Chronic Conditions" },
      { url: "https://journals.sagepub.com/doi/10.1177/20552076241297064", title: "Research on disease management of chronic diseases" },
    ],
  },
  {
    label: "Late diagnosis of disease",
    links: [
      { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7485359/", title: "Interventions Addressing Barriers to Delayed Cancer Diagnosis" },
      { url: "https://aacrjournals.org/cebp/article/34/7/1066/763025/A-Scoping-Review-on-Barriers-to-Cancer-Diagnosis", title: "A Scoping Review on Barriers to Cancer Diagnosis and Care" },
      { url: "https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2024.1438402/full", title: "Breaking barriers: enhancing cancer detection in younger patients" },
      { url: "https://www.scielosp.org/pdf/rpsp/v5n3/a3.pdf", title: "Barriers to early detection of breast cancer among women" },
      { url: "https://www.sciencedirect.com/science/article/pii/S0936655523002030", title: "A Narrative Synthesis of Literature on the Barriers to Timely Cancer Diagnosis" },
    ],
  },
  {
    label: "Lack of accident detection & prevention",
    links: [
      { url: "https://www.ijraset.com/research-paper/next-generation-vehicle-accident-prevention-and-detection", title: "Next-Generation Vehicle Accident Prevention and Detection" },
      { url: "https://onlinelibrary.wiley.com/doi/10.1155/2022/6424835", title: "Accident Detection in Autonomous Vehicles Using Machine Learning" },
      { url: "https://www.ijert.org/real-time-accident-detection-leveraging-deep-learning-for-enhanced-road-safety", title: "Real-Time Accident Detection Leveraging Deep Learning for Enhanced Road Safety" },
      { url: "https://www.scirp.org/journal/paperinformation?paperid=121730", title: "A Review of Road Accidents Detection through Wireless Communication" },
      { url: "https://www.techrxiv.org/users/720422/articles/1358928-machine-learning-based-framework-for-road-accident-detection-and-prevention", title: "Machine Learning-Based Framework for Road Accident Detection and Prevention" },
    ],
  },
];

const computingIssues = [
  {
    label: "The UX pain of GUI",
    links: [
      { url: "https://immune.institute/en/blog/pain-points/", title: "Pain Points, How to work them in UX Strategy?" },
      { url: "https://www.nngroup.com/articles/pain-points/", title: "Three Levels of Pain Points in Customer Experience" },
      { url: "https://www.uxpin.com/studio/blog/user-pain-points-in-ux-design/", title: "What Are User Pain Points?" },
      { url: "https://www.codecademy.com/resources/docs/uiux/user-pain-points", title: "User Pain Points - UI and UX Design" },
      { url: "https://www.ramotion.com/blog/user-pain-points/", title: "User Pain Points: Types of Issues and Their Significance" },
    ],
  },
  {
    label: "Fragmented ecosystem of OSs, apps, and data",
    links: [
      { url: "https://www.ibm.com/think/topics/data-silos", title: "What are Data Silos?" },
      { url: "https://www.salesforce.com/ap/data/connectivity/data-silos/", title: "What Are Data Silos & Why is it a Problem?" },
      { url: "https://dev.to/margaretjohn/from-data-silos-to-decentralized-networks-overcoming-data-fragmentation-with-blockchain-1hp7", title: "From Data Silos to Decentralized Networks" },
      { url: "https://estuary.dev/blog/why-data-silos-problematic/", title: "8 Reasons Why Data Silos Are Problematic & How To Fix Them" },
      { url: "https://dreamitcs.com/blogs/siloed-data-fragmented-strategy-the-hidden-barrier-to-digital-transformation/", title: "Siloed Data, Fragmented Strategy: The Hidden Barrier to Digital Transformation" },
    ],
  },
  {
    label: "IAM pain points",
    links: [
      { url: "https://arxiv.org/abs/2408.10634", title: "Industry Perception of Security Challenges with Identity Access Management Solutions" },
      { url: "https://www.zazz.io/article/top-iam-challenges-for-enterprise-security", title: "Top 10 IAM Challenges Enterprises Must Solve In 2025" },
      { url: "https://ponemonsullivanreport.com/2024/11/the-2024-study-on-the-state-of-identity-and-access-management-iam-security/", title: "The 2024 Study on the State of Identity and Access Management (IAM) Security" },
      { url: "https://www.alef.com/hu/letoltesek/f5-the-challenges-and-benefits-of-identity-and-access-management-en.dm-717.pdf", title: "The Challenges and Benefits of Identity and Access Management" },
      { url: "https://www.scworld.com/resource/not-ideal-each-stage-of-iam-implementation-has-its-pain-points", title: "Not IDeal: Each stage of IAM implementation has its pain points" },
    ],
  },
];

export default function Home() {
  useEffect(() => {
    const adjustPopupPosition = (popup: HTMLElement, trigger: HTMLElement) => {
      // Reset transform to default first to get accurate measurements
      popup.style.transform = 'translateY(-19px)';

      // Use requestAnimationFrame to ensure the reset is applied before measuring
      requestAnimationFrame(() => {
        const popupRect = popup.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate if popup would overflow bottom of viewport
        const wouldOverflowBottom = popupRect.bottom > viewportHeight;

        if (wouldOverflowBottom) {
          // Calculate how much to shift up
          const overflow = popupRect.bottom - viewportHeight + 20; // 20px padding from bottom
          const maxShift = triggerRect.top - 20; // Don't go above viewport top (with 20px padding)
          const shift = Math.min(overflow, maxShift);

          // Apply the shift
          popup.style.transform = `translateY(calc(-19px - ${shift}px))`;
        }
      });
    };

    const handleMouseEnter = (event: Event) => {
      const trigger = event.currentTarget as HTMLElement;
      const popup = trigger.querySelector('.absolute.left-full') as HTMLElement;

      if (popup) {
        adjustPopupPosition(popup, trigger);
      }
    };

    // Find all hoverable items with popups
    const items = document.querySelectorAll('.group');

    items.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      items.forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [, forceUpdate] = useState(0);

  // Force a re-render after mount to ensure audioRef.current is available
  useEffect(() => {
    forceUpdate(1);
  }, []);

  // Minimal data for the audio player (no transcript yet)
  const emptyTranscript = { utterances: [] };
  const emptyChapters: any[] = [];

  return (
    <>
      {/* Audio Player - Hidden audio element */}
      <audio ref={audioRef} src="/audio/SOURCE Setting the Stage.mp3" preload="metadata" />

      <AudioExperienceProvider
        audioSrc="/audio/SOURCE Setting the Stage.mp3"
        transcript={emptyTranscript}
        chapters={emptyChapters}
        audioElement={audioRef.current}
      >
        {/* Mobile: Fixed Footer Audio Player (hidden on lg+) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm p-4 lg:hidden">
          <CustomAudioPlayer />
        </div>

        {/* Main Layout */}
        <div className="min-h-screen pb-32 lg:pb-12">
          {/* Desktop: 3-Column Grid (lg+) */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8 xl:px-12 2xl:px-16">
            {/* Column 1: Audio Player (Desktop only) */}
            <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 lg:sticky lg:top-6 lg:self-start lg:pt-12">
              <CustomAudioPlayer />
            </aside>

            {/* Columns 2-3: Main Content */}
            <div className="lg:col-span-9 xl:col-span-9 px-6 sm:px-12 lg:px-0">
              <div className="flex flex-1 flex-col gap-24 py-12">
        {/* Setting the Stage Section */}
        <section className="mx-auto w-full max-w-xl space-y-8 pt-10">
          <SourceLogo className="mb-24" />
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold sm:text-5xl">Setting the Stage</h1>
            <p className="pt-2 text-base text-muted-foreground">
              To understand what comes next we must first understand the current systemic civilisational problem set.
            </p>
          </div>
        </section>

      {/* The Macro Problem Set Section */}
      <section className="mx-auto w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">The Macro Problem Set</h2>
          <p className="pt-2 text-base text-muted-foreground">
            Global scale problem set the entirety of humanity is currently facing. Most of these directly tie into the low-level anxiety the 99% are facing on a day-to-day basis and must always be kept in mind.
          </p>
        </div>
      </section>

      {/* 2x2 Grid of Categories */}
      <div className="mx-auto w-full max-w-xl lg:max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Economic */}
          <div className="relative sm:border-b sm:border-r lg:border-b-0 lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
            {/* Center Star - positioned at border intersection (only visible on sm to md) */}
            <div className="hidden sm:block lg:hidden absolute bottom-0 right-0 z-10 translate-x-1/2 translate-y-1/2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-12"
                aria-hidden="true"
              >
                <path
                  d="M27.5 0L28.8318 20.5684C29.0266 23.5767 31.4233 25.9734 34.4316 26.1682L55 27.5L34.4316 28.8318C31.4233 29.0266 29.0266 31.4233 28.8318 34.4316L27.5 55L26.1682 34.4316C25.9734 31.4233 23.5767 29.0266 20.5684 28.8318L0 27.5L20.5684 26.1682C23.5767 25.9734 25.9734 23.5767 26.1682 20.5684L27.5 0Z"
                  className="fill-[#CCCCCC] dark:fill-[#333333]"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-lg font-semibold">Economic</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {economicIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                      <ul className="space-y-1">
                        {issue.links.map((link, i) => (
                          <li key={i}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            >
                              <span className="block text-foreground">{link.title}</span>
                              <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="sm:border-b lg:border-b-0 lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
            <h3 className="mb-4 text-lg font-semibold">Social</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {socialIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                    <ul className="space-y-1">
                      {issue.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                          >
                            <span className="block text-foreground">{link.title}</span>
                            <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Political */}
          <div className="sm:border-r lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
            <h3 className="mb-4 text-lg font-semibold">Political</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {politicalIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                      <ul className="space-y-1">
                        {issue.links.map((link, i) => (
                          <li key={i}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            >
                              <span className="block text-foreground">{link.title}</span>
                              <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technological */}
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Technological</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {techIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                      <ul className="space-y-1">
                        {issue.links.map((link, i) => (
                          <li key={i}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            >
                              <span className="block text-foreground">{link.title}</span>
                              <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The Micro Problem Set Section */}
      <section className="mx-auto w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">The Micro Problem Set</h2>
          <p className="pt-2 text-base text-muted-foreground">
            The individual scale problem set that many people face each day. There is obvious overlap with many of the problems outlined in The Macro Problem Set but it&apos;s important to understand how some of these overarching macro issues impact humans on a very specific personal level.
          </p>
        </div>
      </section>

      {/* 2x2 Grid of Micro Problem Categories */}
      <div className="mx-auto w-full max-w-xl lg:max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Mental & Emo */}
          <div className="relative sm:border-b sm:border-r lg:border-b-0 lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
            {/* Center Star - positioned at border intersection (only visible on sm to md) */}
            <div className="hidden sm:block lg:hidden absolute bottom-0 right-0 z-10 translate-x-1/2 translate-y-1/2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-12"
                aria-hidden="true"
              >
                <path
                  d="M27.5 0L28.8318 20.5684C29.0266 23.5767 31.4233 25.9734 34.4316 26.1682L55 27.5L34.4316 28.8318C31.4233 29.0266 29.0266 31.4233 28.8318 34.4316L27.5 55L26.1682 34.4316C25.9734 31.4233 23.5767 29.0266 20.5684 28.8318L0 27.5L20.5684 26.1682C23.5767 25.9734 25.9734 23.5767 26.1682 20.5684L27.5 0Z"
                  className="fill-[#CCCCCC] dark:fill-[#333333]"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-lg font-semibold">Mental & Emo</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {mentalIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                      <ul className="space-y-1">
                        {issue.links.map((link, i) => (
                          <li key={i}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            >
                              <span className="block text-foreground">{link.title}</span>
                              <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="sm:border-b lg:border-b-0 lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
            <h3 className="mb-4 text-lg font-semibold">Social</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {microSocialIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                    <ul className="space-y-1">
                      {issue.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                          >
                            <span className="block text-foreground">{link.title}</span>
                            <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Physical */}
          <div className="sm:border-r lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
            <h3 className="mb-4 text-lg font-semibold">Physical</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {physicalIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                      <ul className="space-y-1">
                        {issue.links.map((link, i) => (
                          <li key={i}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            >
                              <span className="block text-foreground">{link.title}</span>
                              <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Computing UX */}
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Computing UX</h3>
            <ul className="space-y-3 text-sm text-foreground">
              {computingIssues.map((issue) => (
                <li key={issue.label} className="group">
                  <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                    {issue.label}
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 -translate-y-[19px] max-h-[90vh] overflow-y-auto rounded-lg border border-border/70 bg-background p-3 pl-5 opacity-0 shadow-lg dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-900">
                      <ul className="space-y-1">
                        {issue.links.map((link, i) => (
                          <li key={i}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            >
                              <span className="block text-foreground">{link.title}</span>
                              <span className="block text-[10px] text-muted-foreground/60">{getDomain(link.url)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Forecasts Section */}
      <section className="mx-auto w-full max-w-xl space-y-16">
        <div className="space-y-3 px-6 sm:px-0">
          <h1 className="text-4xl font-semibold sm:text-5xl">Forecasts</h1>
          <h2 className="text-2xl font-semibold sm:text-3xl">A Dark Dystopian Future</h2>
          <p className="pt-2 text-base text-muted-foreground">
            Based on the current systemic problem set the forecast does not look hopeful with out a significant civilisational pivot across all core dimensions.
          </p>
        </div>

        {/* Forecast Items - 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 px-6 sm:px-0 sm:-mx-12 md:-mx-24">
          <article className="space-y-2">
            <h3 className="text-lg font-semibold">A New Global Populous Movement</h3>
            <p className="text-sm text-muted-foreground">
              Due to the widespread economic and political discontent across the left, right, and center, there&apos;s a strong possibility that a unification of the 99% will emerge. One that transcends traditional political divides and focuses on addressing the root causes of inequality and disenfranchisement.
            </p>
          </article>

          <article className="space-y-2">
            <h3 className="text-lg font-semibold">Consolidation of Power & Wealth</h3>
            <p className="text-sm text-muted-foreground">
              Increasing wealth concentration to the few will inevitably result in greater social tension and reduce social mobility.
            </p>
            <p className="pt-2 text-sm text-muted-foreground">
              As we continue to move towards AGI and robotics, fewer and fewer humans will be needed to run enterprises and industries. Therefore, fewer and fewer will control the wealth and therefore the power.
            </p>
          </article>

          <article className="space-y-2">
            <h3 className="text-lg font-semibold">Escalating Crime Rates Global</h3>
            <p className="text-sm text-muted-foreground">
              Due to rising unemployment, decrease in purchasing power, increase cost of goods, and social inequality, crime rates will likely increase as individuals are pressure-cooked to their limits and struggle to meet their basic needs.
            </p>
          </article>

          <article className="space-y-2">
            <h3 className="text-lg font-semibold">Possibility for Global Civil War</h3>
            <p className="text-sm text-muted-foreground">
              A war not between the political left and right but between the 99% grass roots populous and the established power structure : government, corporations, and military.
            </p>
          </article>
        </div>
      </section>

      {/* Solution Space Section */}
      <section className="mx-auto w-full max-w-xl space-y-8 pt-32">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold sm:text-5xl">Solution Space</h1>
          <h2 className="text-2xl font-semibold sm:text-3xl">A Novel Approach</h2>
          <p className="pt-2 text-base text-muted-foreground">
            A decentralised open-source trustless hardware + software AI platform to solve the entire problem stack from micro to macro
          </p>
        </div>

        {/* What is SOURCE */}
        <div className="space-y-6 pt-8">
          <h3 className="text-2xl font-semibold">Civilizational-Scale Infrastructure</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            SOURCE represents an infrastructure buildout on the scale of humanity&apos;s greatest achievements. This is not merely a product or platform—it is a fundamental reimagining of how we build the physical and digital infrastructure that underpins human civilization.
          </p>

          {/* Historical Infrastructure Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop"
                  alt="Telegraph Network"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Telegraph Network</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=400&fit=crop"
                  alt="Telephone System"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Telephone System</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop"
                  alt="Electrical Grid"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Electrical Grid</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop"
                  alt="Water Distribution"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Water Distribution</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=400&fit=crop"
                  alt="Plumbing Infrastructure"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Plumbing Infrastructure</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=400&fit=crop"
                  alt="Water Sanitization"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Water Sanitization</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop"
                  alt="Telecommunications"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Telecommunications</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-full aspect-square rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop"
                  alt="Internet Infrastructure"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center text-muted-foreground">Internet Infrastructure</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold pt-4">Decentralized Physical Infrastructure (DePIN)</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            What differentiates SOURCE from previous infrastructure revolutions is its decentralized nature. Rather than centralized control by governments or corporations, SOURCE employs DePIN—Decentralized Physical Infrastructure Networks—where the physical infrastructure lives in every home through SOURCE monitor sensor units installed in each residence.
          </p>

          <h3 className="text-xl font-semibold pt-4">The SOURCE Monitor Sensor Unit</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Each unit is a sophisticated multi-modal sensing and interaction device equipped with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-4">
            <li>LiDAR sensing for spatial awareness and 3D mapping</li>
            <li>Video capture for visual understanding</li>
            <li>Audio sensing for sound and voice recognition</li>
            <li>Surround sound speakers for immersive interaction with your personal AI agent</li>
          </ul>

          <h3 className="text-xl font-semibold pt-4">The SOURCE Compute Unit</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            The computational backbone of SOURCE is distributed across two complementary infrastructure layers:
          </p>

          <div className="pl-4 space-y-4 pt-3">
            <div>
              <h4 className="text-base font-semibold text-foreground mb-2">Private Residence Compute</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                Each home hosts dedicated compute infrastructure built into unused wall space or closets. These private compute units process local data, run personal AI agents, and contribute to the distributed network—bringing enterprise-grade computational power into every household.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-foreground mb-2">Public Space Compute</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                Neighborhoods deploy above-ground or below-ground physical compute server buildouts that are chained together to form a robust mesh network. These public compute nodes connect to SOURCE Sensors installed throughout public spaces—similar to traditional CCTV surveillance systems but fundamentally reimagined with LiDAR, video cameras, microphones, and speakers for comprehensive environmental awareness and interaction.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold pt-4">Community Ownership: Infrastructure by the People, for the People</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Unlike traditional infrastructure controlled by corporations or centralized authorities, SOURCE belongs to the community. The entire neighborhood owns these systems—the sensors, the compute infrastructure, the network. This is infrastructure owned by the 99%, ensuring that the benefits, governance, and value creation remain with the people who use and maintain it.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed pt-3">
            While communities maintain ownership and control, SOURCE operates in partnership with existing government organizations and services, creating a collaborative model that respects established institutions while fundamentally democratizing access to advanced AI infrastructure.
          </p>

          <h3 className="text-xl font-semibold pt-4">Total Integration: Zero Blind Spots</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            The result is unprecedented coverage:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-4">
            <li><strong>100% home integration</strong> — Zero blind spots, zero deaf spots. Complete awareness and interaction capability throughout your living space.</li>
            <li><strong>100% neighborhood integration</strong> — Seamless coverage extends beyond individual homes to create neighborhood-wide networks.</li>
            <li><strong>Universal compute access</strong> — No matter where you go within SOURCE territory, you have access to computational resources and your personal AI agent.</li>
            <li><strong>Persistent AI companion</strong> — Your personal AI agent follows you wherever you go, maintaining continuity of service and understanding across all SOURCE-enabled locations.</li>
          </ul>

          <h3 className="text-xl font-semibold pt-4">A New Era of Infrastructure</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Just as the electrical grid transformed civilization by bringing power to every home, and the telephone network revolutionized communication by connecting every household, SOURCE creates a new foundational layer for the AI age—one that is open, decentralized, and owned by the people who use it.
          </p>
        </div>
      </section>
              </div>
            </div>
          </div>
        </div>
      </AudioExperienceProvider>
    </>
  );
}
