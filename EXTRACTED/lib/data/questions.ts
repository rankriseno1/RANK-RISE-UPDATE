import type { Difficulty, Question } from '@/lib/types'

/**
 * DEMO QUESTION BANK
 * These are original practice questions written for the first version of Rank Rise.
 * The exam and year tags are illustrative only — they are NOT claims that a question
 * appeared in a specific official paper. Replace with the verified PYQ database later.
 */

type Row = [
  id: string,
  subjectSlug: string,
  topic: string,
  difficulty: Difficulty,
  examSlug: string,
  year: number,
  text: string,
  options: [string, string, string, string],
  correctIndex: number,
  explanation: string,
]

const ROWS: Row[] = [
  ['q-pol-1', 'polity', 'Fundamental Rights', 'Easy', 'ssc-cgl', 2022, 'Which Article of the Indian Constitution provides the Right to Constitutional Remedies?', ['Article 14', 'Article 19', 'Article 32', 'Article 21'], 2, 'Article 32 allows citizens to approach the Supreme Court directly for enforcement of Fundamental Rights.'],
  ['q-pol-2', 'polity', 'Sources of Constitution', 'Medium', 'upsc-cse', 2021, "The idea of 'Directive Principles of State Policy' was borrowed from the constitution of which country?", ['United States', 'Ireland', 'United Kingdom', 'Canada'], 1, 'The DPSPs in Part IV were inspired by the Irish Constitution.'],
  ['q-pol-3', 'polity', 'Constitutional Bodies', 'Easy', 'ssc-chsl', 2020, 'Who appoints the Chief Election Commissioner of India?', ['Prime Minister', 'Chief Justice of India', 'President of India', 'Parliament'], 2, 'The President appoints the Chief Election Commissioner and other Election Commissioners.'],
  ['q-pol-4', 'polity', 'Parliament', 'Easy', 'police-psi', 2023, 'What is the minimum age to become a member of the Rajya Sabha?', ['25 years', '30 years', '35 years', '21 years'], 1, 'Article 84 sets the minimum age for the Rajya Sabha at 30 years.'],
  ['q-pol-5', 'polity', 'Amendments', 'Medium', 'upsc-cse', 2019, "Which Constitutional Amendment Act is popularly known as the 'Mini Constitution'?", ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'], 0, 'The 42nd Amendment (1976) made sweeping changes, earning it the name Mini Constitution.'],
  ['q-pol-6', 'polity', 'Fundamental Duties', 'Hard', 'kpsc', 2022, 'Fundamental Duties were added to the Constitution on the recommendation of which committee?', ['Sarkaria Commission', 'Swaran Singh Committee', 'Balwant Rai Mehta Committee', 'Ashok Mehta Committee'], 1, 'The Swaran Singh Committee (1976) recommended adding Fundamental Duties via Article 51A.'],

  ['q-his-1', 'history', 'Modern India', 'Easy', 'ssc-cgl', 2021, 'In which year was the Battle of Plassey fought?', ['1757', '1764', '1857', '1761'], 0, 'The Battle of Plassey (1757) established British dominance in Bengal.'],
  ['q-his-2', 'history', 'Freedom Struggle', 'Easy', 'rrb-ntpc', 2020, 'Who is credited with founding the Indian National Congress in 1885?', ['A. O. Hume', 'Dadabhai Naoroji', 'W. C. Bonnerjee', 'Bal Gangadhar Tilak'], 0, 'A. O. Hume, a retired British civil servant, played the key role in founding the INC. W. C. Bonnerjee was its first president.'],
  ['q-his-3', 'history', 'Freedom Struggle', 'Easy', 'ssc-gd', 2022, 'The Dandi March was launched in which year?', ['1920', '1930', '1942', '1919'], 1, 'Gandhi began the Salt March to Dandi on 12 March 1930.'],
  ['q-his-4', 'history', 'Ancient India', 'Easy', 'ssc-mts', 2023, 'Which Mauryan ruler embraced Buddhism after the Kalinga War?', ['Chandragupta Maurya', 'Bindusara', 'Ashoka', 'Dasharatha'], 2, 'Ashoka turned to Buddhism after witnessing the devastation of the Kalinga War.'],
  ['q-his-5', 'history', 'Modern India', 'Medium', 'upsc-cse', 2020, 'The Doctrine of Lapse was most extensively applied by which Governor-General?', ['Lord Dalhousie', 'Lord Canning', 'Lord Wellesley', 'Lord Curzon'], 0, 'Lord Dalhousie annexed states such as Satara and Jhansi using the Doctrine of Lapse.'],
  ['q-his-6', 'history', 'Ancient India', 'Medium', 'defence', 2021, 'The Harappan site of Lothal is located in which present-day state?', ['Rajasthan', 'Gujarat', 'Punjab', 'Haryana'], 1, 'Lothal, known for its dockyard, is in Gujarat.'],

  ['q-geo-1', 'geography', 'Rivers', 'Easy', 'ssc-chsl', 2021, 'Which is the longest river of peninsular India?', ['Godavari', 'Krishna', 'Narmada', 'Kaveri'], 0, 'The Godavari is the longest peninsular river and is often called the Dakshin Ganga.'],
  ['q-geo-2', 'geography', 'Physical Features', 'Medium', 'rrb-ntpc', 2022, 'The Tropic of Cancer does NOT pass through which of these states?', ['Gujarat', 'Odisha', 'Rajasthan', 'Mizoram'], 1, 'The Tropic of Cancer passes through eight states; Odisha is not one of them.'],
  ['q-geo-3', 'geography', 'Physical Features', 'Medium', 'kpsc', 2020, 'Which is the highest peak of the Western Ghats?', ['Doddabetta', 'Anamudi', 'Mahendragiri', 'Kalsubai'], 1, 'Anamudi in Kerala is the highest peak in the Western Ghats.'],
  ['q-geo-4', 'geography', 'Soils', 'Easy', 'rrb-group-d', 2023, 'Which soil is considered most suitable for cotton cultivation?', ['Alluvial soil', 'Red soil', 'Black soil', 'Laterite soil'], 2, 'Black (regur) soil retains moisture well, making it ideal for cotton.'],
  ['q-geo-5', 'geography', 'Physical Features', 'Easy', 'defence', 2022, 'The Palk Strait separates India from which country?', ['Maldives', 'Sri Lanka', 'Myanmar', 'Bangladesh'], 1, 'The Palk Strait lies between Tamil Nadu and northern Sri Lanka.'],

  ['q-sci-1', 'science', 'Chemistry', 'Easy', 'rrb-group-d', 2021, 'What is the chemical formula of common salt?', ['NaCl', 'KCl', 'NaOH', 'CaCO₃'], 0, 'Common salt is sodium chloride, NaCl.'],
  ['q-sci-2', 'science', 'Biology', 'Easy', 'ssc-gd', 2021, 'Deficiency of which vitamin causes scurvy?', ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], 2, 'Scurvy results from a lack of Vitamin C (ascorbic acid).'],
  ['q-sci-3', 'science', 'Physics', 'Easy', 'rrb-ntpc', 2023, 'What is the SI unit of electric current?', ['Volt', 'Ohm', 'Ampere', 'Watt'], 2, 'The ampere is the SI base unit of electric current.'],
  ['q-sci-4', 'science', 'Biology', 'Easy', 'ssc-chsl', 2022, "Which cell organelle is known as the 'powerhouse of the cell'?", ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], 1, 'Mitochondria produce ATP through cellular respiration.'],
  ['q-sci-5', 'science', 'Chemistry', 'Easy', 'ssc-mts', 2022, "Which gas is most abundant in the Earth's atmosphere?", ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], 2, 'Nitrogen makes up roughly 78% of the atmosphere.'],
  ['q-sci-6', 'science', 'Physics', 'Medium', 'defence', 2020, 'In which medium does sound travel the fastest?', ['Air', 'Water', 'Steel', 'Vacuum'], 2, 'Sound travels fastest in solids such as steel and cannot travel through a vacuum.'],
  ['q-sci-7', 'science', 'Human Body', 'Medium', 'rrb-group-d', 2022, 'Which blood group is known as the universal donor?', ['AB positive', 'O negative', 'A positive', 'B negative'], 1, 'O negative red cells lack A, B and Rh antigens, so they can be given to most recipients.'],

  ['q-eco-1', 'economics', 'Budget', 'Easy', 'ssc-cgl', 2023, 'Who presents the Union Budget in the Parliament of India?', ['Prime Minister', 'Finance Minister', 'RBI Governor', 'President'], 1, 'The Union Finance Minister presents the Annual Financial Statement.'],
  ['q-eco-2', 'economics', 'Banking & RBI', 'Medium', 'ibps-sbi', 2022, 'Repo rate is the rate at which:', ['Banks lend to the RBI', 'The RBI lends to commercial banks', 'Banks lend to the public', 'The government borrows from the World Bank'], 1, 'Repo rate is the rate at which the RBI lends short-term funds to commercial banks.'],
  ['q-eco-3', 'economics', 'Taxation', 'Easy', 'ibps-sbi', 2021, 'The Goods and Services Tax (GST) came into effect in India on:', ['1 April 2017', '1 July 2017', '1 January 2018', '1 July 2016'], 1, 'GST was rolled out nationwide on 1 July 2017.'],
  ['q-eco-4', 'economics', 'Planning', 'Easy', 'upsc-cse', 2022, 'NITI Aayog replaced which body in 2015?', ['Finance Commission', 'Planning Commission', 'National Development Council', 'Election Commission'], 1, 'NITI Aayog replaced the Planning Commission on 1 January 2015.'],
  ['q-eco-5', 'economics', 'Taxation', 'Easy', 'state-psc', 2023, 'Which of the following is a direct tax?', ['GST', 'Customs duty', 'Income tax', 'Excise duty'], 2, 'Income tax is paid directly by the individual to the government.'],

  ['q-rea-1', 'reasoning', 'Series', 'Easy', 'ssc-cgl', 2020, 'Find the next number in the series: 2, 6, 12, 20, 30, ?', ['40', '42', '44', '36'], 1, 'Differences are 4, 6, 8, 10, so the next difference is 12: 30 + 12 = 42.'],
  ['q-rea-2', 'reasoning', 'Coding-Decoding', 'Easy', 'ssc-mts', 2021, 'If CAT is coded as DBU, how is DOG coded?', ['EPH', 'EPG', 'DPH', 'FQI'], 0, 'Each letter is shifted forward by one: D→E, O→P, G→H.'],
  ['q-rea-3', 'reasoning', 'Blood Relations', 'Medium', 'police-psi', 2022, "Pointing to a man, Riya says, \"He is the son of my grandfather's only son.\" How is the man related to Riya?", ['Cousin', 'Brother', 'Uncle', 'Father'], 1, "Her grandfather's only son is her father, and her father's son is her brother."],
  ['q-rea-4', 'reasoning', 'Classification', 'Easy', 'ssc-gd', 2023, 'Find the odd one out.', ['Triangle', 'Square', 'Circle', 'Pentagon'], 2, 'All others are polygons with straight sides; a circle is not.'],
  ['q-rea-5', 'reasoning', 'Clocks', 'Hard', 'ibps-sbi', 2023, 'What is the angle between the hour and minute hands of a clock at 3:15?', ['0°', '7.5°', '15°', '22.5°'], 1, 'Minute hand is at 90°, hour hand at 90° + 15 × 0.5° = 97.5°. Difference = 7.5°.'],

  ['q-mat-1', 'mathematics', 'Percentage', 'Easy', 'ssc-chsl', 2023, 'What is 15% of 240?', ['32', '36', '38', '40'], 1, '0.15 × 240 = 36.'],
  ['q-mat-2', 'mathematics', 'Speed & Distance', 'Medium', 'rrb-ntpc', 2021, 'A 150 m long train crosses a pole in 10 seconds. What is its speed in km/h?', ['45 km/h', '54 km/h', '60 km/h', '50 km/h'], 1, 'Speed = 150/10 = 15 m/s = 15 × 18/5 = 54 km/h.'],
  ['q-mat-3', 'mathematics', 'Interest', 'Easy', 'ibps-sbi', 2020, 'What is the simple interest on ₹5,000 at 8% per annum for 3 years?', ['₹1,000', '₹1,200', '₹1,500', '₹1,800'], 1, 'SI = (5000 × 8 × 3) / 100 = ₹1,200.'],
  ['q-mat-4', 'mathematics', 'Averages', 'Easy', 'ssc-mts', 2020, 'What is the average of the first 10 natural numbers?', ['5', '5.5', '6', '4.5'], 1, 'Sum = 55, average = 55 / 10 = 5.5.'],
  ['q-mat-5', 'mathematics', 'Ratio', 'Medium', 'ssc-gd', 2020, 'Two numbers are in the ratio 3 : 5 and their sum is 64. What is the larger number?', ['24', '36', '40', '45'], 2, 'Each part = 64 / 8 = 8, so the larger number = 5 × 8 = 40.'],
  ['q-mat-6', 'mathematics', 'Profit & Loss', 'Hard', 'ssc-cgl', 2022, 'An item is marked 25% above its cost price and sold at a 10% discount. What is the profit percentage?', ['12.5%', '15%', '10%', '12%'], 0, 'Selling price = 1.25 × 0.9 = 1.125 of cost, so profit = 12.5%.'],

  ['q-eng-1', 'english', 'Synonyms', 'Easy', 'ssc-cgl', 2021, "Choose the synonym of 'Abundant'.", ['Scarce', 'Plentiful', 'Rare', 'Limited'], 1, 'Abundant means existing in large quantities, i.e. plentiful.'],
  ['q-eng-2', 'english', 'Antonyms', 'Medium', 'defence', 2023, "Choose the antonym of 'Benevolent'.", ['Kind', 'Generous', 'Malevolent', 'Humble'], 2, 'Benevolent means well-meaning; its opposite is malevolent.'],
  ['q-eng-3', 'english', 'Spelling', 'Easy', 'ssc-chsl', 2020, 'Choose the correctly spelt word.', ['Accomodation', 'Accommodation', 'Acommodation', 'Accommadation'], 1, "'Accommodation' has double 'c' and double 'm'."],
  ['q-eng-4', 'english', 'Idioms', 'Easy', 'ibps-sbi', 2022, "What does the idiom 'to break the ice' mean?", ['To start a conversation', 'To cause trouble', 'To end a friendship', 'To work very hard'], 0, 'To break the ice means to ease initial tension and begin a conversation.'],

  ['q-gk-1', 'gk', 'National Symbols', 'Medium', 'ssc-gd', 2021, 'Which is the national aquatic animal of India?', ['Gangetic river dolphin', 'Blue whale', 'Gharial', 'Olive ridley turtle'], 0, 'The Gangetic river dolphin was declared the national aquatic animal in 2009.'],
  ['q-gk-2', 'gk', 'Important Places', 'Easy', 'rrb-group-d', 2020, "Which city is often called the 'Silicon Valley of India'?", ['Hyderabad', 'Pune', 'Bengaluru', 'Chennai'], 2, 'Bengaluru is known for its concentration of IT companies.'],
  ['q-gk-3', 'gk', 'Art & Culture', 'Medium', 'kpsc', 2021, 'Kuchipudi is a classical dance form that originated in which state?', ['Kerala', 'Andhra Pradesh', 'Odisha', 'Tamil Nadu'], 1, 'Kuchipudi is named after a village in Andhra Pradesh.'],

  ['q-ca-1', 'current-affairs', 'Science & Space', 'Easy', 'rrb-ntpc', 2023, 'Which organisation launched the Chandrayaan-3 mission?', ['ISRO', 'DRDO', 'NASA', 'HAL'], 0, 'Chandrayaan-3 was launched by the Indian Space Research Organisation in 2023.'],
  ['q-ca-2', 'current-affairs', 'Science & Space', 'Medium', 'upsc-cse', 2023, "Chandrayaan-3's lander touched down near which region of the Moon?", ['North polar region', 'South polar region', 'Equatorial region', 'Far-side mid-latitudes'], 1, 'Vikram landed near the lunar south pole in August 2023.'],
  ['q-ped-1', 'pedagogy', 'Learning Theories', 'Easy', 'ctet', 2022, "According to Piaget, a child who can think logically about concrete objects but not abstract ideas is in which stage?", ['Sensorimotor', 'Pre-operational', 'Concrete operational', 'Formal operational'], 2, 'The concrete operational stage (about 7–11 years) is marked by logical thinking tied to concrete situations.'],
  ['q-ped-2', 'pedagogy', 'Learning Theories', 'Medium', 'ctet', 2023, "The 'Zone of Proximal Development' concept was proposed by:", ['Jean Piaget', 'Lev Vygotsky', 'B. F. Skinner', 'Howard Gardner'], 1, 'Vygotsky described the ZPD as the gap between what a learner can do alone and with guidance.'],
  ['q-ped-3', 'pedagogy', 'Assessment', 'Easy', 'kvs-tgt', 2022, 'Continuous and Comprehensive Evaluation (CCE) primarily aims to:', ['Rank students by marks', 'Reduce the role of teachers', 'Assess all aspects of a learner’s development', 'Replace classroom teaching'], 2, 'CCE covers scholastic and co-scholastic development through regular, varied assessment.'],
  ['q-ped-4', 'pedagogy', 'Inclusive Education', 'Medium', 'ctet', 2021, 'Dyslexia is primarily associated with difficulty in:', ['Reading', 'Writing numbers', 'Motor coordination', 'Hearing'], 0, 'Dyslexia is a specific learning disability affecting reading and related language skills.'],
  ['q-ped-5', 'pedagogy', 'Child Development', 'Easy', 'kvs-tgt', 2023, 'Which of these is the best example of intrinsic motivation?', ['Studying to win a prize', 'Reading because the topic is interesting', 'Finishing homework to avoid punishment', 'Practising for parental approval'], 1, 'Intrinsic motivation comes from interest or enjoyment in the activity itself.'],

  ['q-eco-6', 'economics', 'Banking & RBI', 'Hard', 'rbi-grade-b', 2023, 'Which instrument does the RBI use to absorb surplus liquidity without providing collateral, introduced in 2022?', ['Reverse Repo', 'Standing Deposit Facility', 'Marginal Standing Facility', 'Cash Reserve Ratio'], 1, 'The Standing Deposit Facility (SDF) lets the RBI absorb liquidity without offering government securities as collateral.'],
  ['q-eco-7', 'economics', 'Banking & RBI', 'Medium', 'lic-aao', 2022, 'Which body regulates the insurance sector in India?', ['SEBI', 'IRDAI', 'PFRDA', 'NABARD'], 1, 'The Insurance Regulatory and Development Authority of India (IRDAI) regulates insurance.'],

  ['q-ca-3', 'current-affairs', 'Summits & Events', 'Easy', 'state-psc', 2023, 'Which country hosted the G20 Leaders’ Summit in 2023?', ['India', 'Indonesia', 'Brazil', 'Japan'], 0, 'India hosted the G20 Leaders’ Summit in New Delhi in September 2023.'],
]

export const QUESTIONS: Question[] = ROWS.map(
  ([id, subjectSlug, topic, difficulty, examSlug, year, text, options, correctIndex, explanation]) => ({
    id,
    subjectSlug,
    topic,
    difficulty,
    examSlug,
    year,
    text,
    options,
    correctIndex,
    explanation,
  }),
)

export const PYQ_YEARS = Array.from(new Set(QUESTIONS.map((q) => q.year))).sort((a, b) => b - a)
