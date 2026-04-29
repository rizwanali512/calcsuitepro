export type GradingEntry = {
  grade: string;
  point: number;
};

export type University = {
  rank?: number;
  slug: string;
  name: string;
  short: string;
  scale: number;
  location: string;
  logo?: string;
  featuredImage?: string;
  description?: string;
  officialSite?: string;
  grading: GradingEntry[];
};

export const DEFAULT_GRADING_4: GradingEntry[] = [
  { grade: 'A', point: 4.0 },
  { grade: 'A-', point: 3.7 },
  { grade: 'B+', point: 3.3 },
  { grade: 'B', point: 3.0 },
  { grade: 'B-', point: 2.7 },
  { grade: 'C+', point: 2.3 },
  { grade: 'C', point: 2.0 },
  { grade: 'C-', point: 1.7 },
  { grade: 'D+', point: 1.3 },
  { grade: 'D', point: 1.0 },
  { grade: 'F', point: 0.0 },
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const SHORT_STOPWORDS = new Set([
  'of',
  'the',
  'and',
  'for',
  'in',
  'at',
  'a',
  'an',
  'university',
  'institute',
  'college',
  'school',
  'sciences',
  'science',
  'technology',
  'engineering',
  'medical',
  'health',
  'management',
  'business',
  'women',
  'arts',
  'architecture',
  'design',
  'development',
  'studies',
  'information',
  'national',
  'pakistan',
]);

function shortCodeFromName(name: string) {
  const cleaned = name.replace(/[^a-z0-9 ]/gi, ' ').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  const parts = words
    .filter((w) => !SHORT_STOPWORDS.has(w.toLowerCase()))
    .slice(0, 5)
    .map((w) => w[0]!.toUpperCase());
  const code = parts.join('');
  return code.length >= 2 ? code : (words[0]?.slice(0, 4).toUpperCase() ?? 'UNI');
}

function parseRankedUniversityLines(raw: string) {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const parsed: Array<{ rank: number; name: string; town: string }> = [];

  for (const line of lines) {
    if (/^rank\s+/i.test(line)) continue;
    const m = line.match(/^(\d+)\s+(.*)$/);
    if (!m) continue;
    const rank = Number(m[1]);
    const rest = (m[2] ?? '').trim();

    // Prefer tab separation, else split on 2+ spaces, else last single space.
    let name = '';
    let town = '';
    const sep =
      rest.match(/^(.*)\t+(.+)$/) ??
      rest.match(/^(.*)\s{2,}(.+)$/) ??
      rest.match(/^(.*)\s+([^ ]+)$/);
    if (sep) {
      name = (sep[1] ?? '').trim();
      town = (sep[2] ?? '').trim();
    }

    if (!name || !town || !Number.isFinite(rank)) continue;
    parsed.push({ rank, name, town });
  }

  return parsed;
}

function buildUniversity({
  rank,
  name,
  town,
}: {
  rank: number;
  name: string;
  town: string;
}): University {
  const slug = slugify(name);
  return {
    rank,
    slug,
    name,
    short: shortCodeFromName(name),
    scale: 4.0,
    location: town,
    description: `Use this page to calculate GPA, CGPA, and view the grading scale for ${name} (${town}).`,
    grading: DEFAULT_GRADING_4,
  };
}

/**
 * Add new universities by appending to this array.
 * Keep `slug` stable (used in URLs) and ensure grading points match official policy.
 */
const featuredUniversities: University[] = [
  {
    slug: 'iiui',
    name: 'International Islamic University Islamabad',
    short: 'IIUI',
    scale: 4.0,
    location: 'Islamabad',
    logo: '/images/universities/iiui/logo.svg',
    featuredImage: '/images/universities/iiui/cover.svg',
    description:
      'Premier Islamic university offering comprehensive academic programs in Islamabad.',
    grading: DEFAULT_GRADING_4,
  },
  {
    slug: 'nust',
    name: 'National University of Sciences and Technology',
    short: 'NUST',
    scale: 4.0,
    location: 'Islamabad',
    logo: '/images/universities/nust/logo.svg',
    featuredImage: '/images/universities/nust/cover.svg',
    description:
      'Leading science and engineering university in Pakistan, based in Islamabad.',
    grading: DEFAULT_GRADING_4,
  },
  {
    slug: 'pu',
    name: 'University of the Punjab',
    short: 'PU',
    scale: 4.0,
    location: 'Lahore',
    logo: '/images/universities/pu/logo.svg',
    featuredImage: '/images/universities/pu/cover.svg',
    description: 'Historic public university in Lahore offering diverse disciplines.',
    grading: DEFAULT_GRADING_4,
  },
  {
    slug: 'uet-lahore',
    name: 'University of Engineering and Technology Lahore',
    short: 'UET Lahore',
    scale: 4.0,
    location: 'Lahore',
    logo: '/images/universities/uet-lahore/logo.svg',
    featuredImage: '/images/universities/uet-lahore/cover.svg',
    description:
      'Engineering-focused university in Lahore known for strong technical programs.',
    grading: DEFAULT_GRADING_4,
  },
  {
    slug: 'uok',
    name: 'University of Karachi',
    short: 'UOK',
    scale: 4.0,
    location: 'Karachi',
    logo: '/images/universities/uok/logo.svg',
    featuredImage: '/images/universities/uok/cover.svg',
    description: 'Major public university in Karachi with a wide range of faculties.',
    grading: DEFAULT_GRADING_4,
  },
];

const RAW_PAKISTAN_UNIVERSITIES = `
142  Abasyn University  Peshawar
147  Abbottabad University of Science and Technology  Abbottabad
97  Abdul Wali Khan University Mardan  Mardan
3  Aga Khan University  Karachi
42  Air University  Islamabad
114  Al-Ghazali University  Karachi
182  Al-Hamd Islamic University  Quetta
218  Ali Institute of Education  Lahore
242  Al-Karam International Institute  Bhera
197  Al-Kawthar University  Karachi
214  Aror University of Art, Architecture, Design and Heritage  Sukkur
203  Baba Guru Nanak University  Nankana Sahib
95  Bacha Khan University  Charsadda
23  Bahauddin Zakariya University  Multan
13  Bahria University  Islamabad
128  Balochistan University of Engineering and Technology  Khuzdar
75  Balochistan University of Information Technology, Engineering and Management Sciences  Quetta
103  Baqai Medical University  Karachi
88  Beaconhouse National University  Lahore
215  Begum Nustrat Bhutto Women University  Sukkur
156  Benazir Bhutto Shaheed University Lyari  Karachi
191  Benazir Bhutto Shaheed University of Technology and Skill Development  Khairpur
177  Bolan University of Medical and Health Sciences  Quetta
80  Capital University of Science and Technology  Islamabad
119  CECOS University  Peshawar
155  Cholistan University of Veterinary and Animal Sciences  Bahawalpur
113  City University of Science and Information Technology  Peshawar
181  Commecs Institute of Business and Emerging Sciences  Karachi
7  COMSATS University Islamabad  Islamabad
198  Dadabhoy Institute of Higher Education  Karachi
245  Dar-ul-Madina International University  Islamabad
134  Dawood University of Engineering and Technology  Karachi
65  DHA Suffa University  Karachi
28  DOW University of Health Sciences  Saddar Town
234  Emaan Institute of Management and Sciences  Karachi
206  Emerson University, Multan  Multan
116  Faisalabad Medical University  Faisalabad
227  FATA University  Darra Adam Khel
174  Fatima Jinnah Medical University  Lahore
64  Fatima Jinnah Women University  Rawalpindi
77  Federal Urdu University of Arts, Sciences and Technology  Gulshan Town
29  Forman Christian College  Lahore
69  Foundation University Islamabad  Islamabad
222  Gambat Institute of Medical Sciences  Khairpur
175  Gandhara University  Peshawar
236  Ghazi National Institute of Engineering and Sciences  Dera Ghazi Khan
153  Ghazi University  Dera Ghazi Khan
41  Ghulam Ishaq Khan Institute of Engineering Sciences and Technology  Topi
63  GIFT University  Gujranwala
126  Gomal University  Dera Ismail Khan
39  Government College University, Faisalabad  Faisalabad
195  Government College University, Hyderabad  Hyderabad
26  Government College University, Lahore  Lahore
117  Government College Women University, Faisalabad  Faisalabad
170  Government College Women University, Sialkot  Sialkot
133  Greenwich University  Karachi
46  Habib University  Karachi
122  Hajvery University  Lahore
82  Hamdard University  Karachi
247  Hands-Institute of Development Studies  Karachi
49  Hazara University  Dhodial
137  HITEC University  Taxila
132  Ibadat International University  Islamabad
183  Ibn-e-Sina University  Mirpur Khas
105  ILMA University  Karachi
204  Imperial College of Business Studies  Lahore
115  Indus University, Pakistan  Karachi
118  Indus Valley School of Art and Architecture  Karachi
74  Information Technology University  Lahore
192  Institute for Art and Culture  Lahore
9  Institute of Business Administration  Karachi
31  Institute of Business Management  Karachi
81  Institute of Management Sciences  Peshawar
68  Institute of Space Technology  Islamabad
237  International Institute of Science, Arts and Technology  Gujranwala
25  International Islamic University, Islamabad  Islamabad
160  Iqra National University  Peshawar
18  Iqra University  Karachi
167  Islamia College Peshawar  Peshawar
73  Isra University  Hyderabad
123  Jinnah Sindh Medical University  Karachi
61  Jinnah University for Women  Karachi
44  Karachi Institute of Economics and Technology  Karachi
221  Karachi Institute of Technology and Entrepreneurship  Karachi
176  Karachi School for Business and Leadership  Karachi
59  Karakurum International University  Gilgit
79  KASB Institute of Technology  Karachi
205  Khushal Khan Khattak University  Karak
98  Khwaja Fareed University of Engineering & Information Technology  Rahim Yar Khan
15  Khyber Medical University  Peshawar
52  King Edward Medical University  Lahore
89  Kinnaird College for Women  Lahore
107  Kohat University of Science and Technology  Kohat
161  Kohsar University Murree  Rawalpindi
66  Lahore College for Women University  Lahore
71  Lahore Garrison University  Lahore
243  Lahore Institute of Science and Technology  Lahore
121  Lahore Leads University  Lahore
109  Lahore School of Economics  Lahore
219  Lahore University of Biological and Applied Sciences  Lahore
2  Lahore University of Management Sciences  Lahore
131  Lasbela University of Agriculture, Water and Marine Sciences  Lasbela
34  Liaquat University of Medical and Health Sciences  Jamshoro
220  Malir University of Science and Technology  Karachi
17  Mehran University of Engineering and Technology  Jamshoro
230  Metropolitan University Karachi  Karachi
196  Millennium Institute of Technology and Entrepreneurship  Karachi
54  Minhaj University  Lahore
102  Mirpur University of Science and Technology  Mirpur
96  Mohammad Ali Jinnah University  Karachi
157  Mohi-ud-Din Islamic University  Trarkhal
93  Muhammad Nawaz Shareef University of Agriculture, Multan  Multan
202  Muhammad Nawaz Sharif University of Engineering and Technology  Multan
179  Multan University of Science and Technology  Multan
200  Muslim Youth University  Islamabad
125  Namal University  Mianwali
86  National College of Arts  Lahore
124  National College of Business Administration and Economics  Lahore
60  National Defence University  Islamabad
178  National Skills University  Islamabad
62  National Textile University  Faisalabad
5  National University of Computer and Emerging Sciences  Islamabad
45  National University of Medical Sciences  Rawalpindi
32  National University of Modern Languages  Islamabad
246  National University of Pakistan  Rawalpindi
1  National University of Sciences and Technology  Islamabad
110  National University of Technology  Islamabad
136  Nazeer Hussain University  Karachi
21  NED University of Engineering and Technology  Karachi
163  Newports Institute of Communications and Economics  Karachi
188  NFC Institute of Engineering and Technology  Multan
158  Nishtar Medical University  Multan
173  Northern University  Nowshera
199  Nur International University  Lahore
127  Pak-Austria Fachhochschule Institute of Applied Sciences and Technology  Haripur
207  Pakistan Global Institute  Rawalpindi
22  Pakistan Institute of Development Economics  Islamabad
51  Pakistan Institute of Engineering and Applied Sciences  Islamabad
144  Pakistan Institute of Fashion and Design  Lahore
180  Peoples University of Medical and Health Sciences for Women  Nawabshah
50  Pir Mehr Ali Shah Arid Agriculture University  Rawalpindi
141  Preston University  Kohat
162  Punjab Tianjin University of Technology  Lahore
213  Punjab University of Technology  Mandi Bahauddin
217  Qarshi University  Lahore
112  Quaid-e-Awam University of Engineering, Science and Technology  Nawabshah
16  Quaid-i-Azam University  Islamabad
72  Qurtaba University of Science and Information Technology  Dera Ismail Khan
211  Rashid Latif Khan University  Lahore
100  Rawalpindi Medical University  Rawalpindi
146  Rawalpindi Women University  Rawalpindi
14  Riphah International University  Islamabad
225  Saifee Burhani University  Karachi
83  Salim Habib University  Karachi
129  Sardar Bahadur Khan Women's University  Quetta
101  Sarhad University of Science and Information Technology  Peshawar
67  Shah Abdul Latif University  Khairpur
238  Shaheed Allah Buksh Soomro University of Arts, Design and Heritages  Jamshoro
239  Shaheed Benazir Bhutto City University  Karachi
240  Shaheed Benazir Bhutto Dewan University  Karachi
172  Shaheed Benazir Bhutto University  Sheringal
171  Shaheed Benazir Bhutto University of Veterinary and Animal Sciences  Sakrand
130  Shaheed Benazir Bhutto University Shaheed Benazirabad  Nawabshah
106  Shaheed Benazir Bhutto Women University  Peshawar
111  Shaheed Mohtarma Benazir Bhutto Medical University  Larkana
48  Shaheed Zulfiqar Ali Bhutto Institute of Science and Technology  Karachi
33  Shaheed Zulfiqar Ali Bhutto Medical University  Islamabad
186  Shaheed Zulfiqar Ali Bhutto University of Law  Karachi
43  Shifa Tameer-e-Millat University  Islamabad
104  Sindh Agriculture University  Tandojam
229  Sindh Institute of Management and Technology  Karachi
87  Sindh Institute of Medical Sciences  Karachi
84  Sindh Madresatul Islam University  Karachi
140  Sir Syed CASE Institute of Technology  Islamabad
55  Sir Syed University of Engineering and Technology  Karachi
187  Sohail University  Karachi
19  Sukkur Institute of Business Administration  Sukkur
35  Superior University  Lahore
154  Textile Institute of Pakistan  Karachi
149  Thal University  Bhakkar
190  The Government Sadiq College Women University  Bahawalpur
223  The Grand Asian University  Sialkot
165  The Green International University  Lahore
194  The Institute of Management Sciences  Lahore
36  The Islamia University of Bahawalpur  Bahawalpur
232  The Shaikh Ayaz University Shikarpur  Shikarpur
233  The University of Agriculture, D. I. Khan  Dera Ismail Khan
57  The University of Agriculture, Peshawar  Peshawar
224  The University of Agriculture, Swat  Mingora
85  The University of Faisalabad  Faisalabad
11  The University of Lahore  Lahore
241  The University of Modern Sciences  Tando Muhammad Khan
139  The Women University Multan  Multan
166  UIT University, Karachi  Karachi
20  University of Agriculture, Faisalabad  Faisalabad
193  University of Art and Culture, Jamshoro  Jamshoro
120  University of Azad Jammu and Kashmirs  Muzaffarabad
53  University of Balochistan  Quetta
78  University of Baltistan, Skardu  Skardu
208  University of Buner  Buner
12  University of Central Punjab  Lahore
231  University of Chakwal  Chakwal
150  University of Chenab  Gujrat
169  University of Child Health Sciences  Lahore
94  University of Chitral  Chitral
38  University of Education  Lahore
201  University of Engineering and Applied Sciences Swat  Kanju
10  University of Engineering and Technology, Lahore  Lahore
151  University of Engineering and Technology, Mardan  Mardan
92  University of Engineering and Technology, Peshawar  Peshawar
58  University of Engineering and Technology, Taxila  Taxila
47  University of Gujrat  Gujrat
108  University of Gwadar  Gawadar
76  University of Haripur  Haripur
6  University of Health Sciences, Lahore  Lahore
138  University of Home Economics  Lahore
216  University of Jhang  Jhang
40  University of Karachi  Karachi
184  University of Kotli Azad Jammu and Kashmir  Kotli
168  University of Lakki Marwat  Lakki Marwat
244  University of Layyah  Layyah
226  University of Loralai  Loralai
248  University of Makran  Panjgur
91  University of Malakand  Chakdara
8  University of Management and Technology  Lahore
209  University of Mianwali  Mianwali
212  University of Narowal  Narowal
164  University of Okara  Okara
27  University of Peshawar  Peshawar
148  University of Poonch Rawalakot  Rawalakot
189  University of Sahiwal  Sahiwal
37  University of Sargodha  Sargodha
152  University of Science and Technology, Bannu  Bannu
143  University of Sialkot  Sialkot
24  University of Sindh  Jamshoro
90  University of South Asia  Lahore
70  University of Southern Punjab  Multan
235  University of Sufism and Modern Sciences  Bhit Shah
185  University of Swabi  Swabi
145  University of Swat  Mingora
4  University of the Punjab  Lahore
159  University of Turbat  Turbat
56  University of Veterinary and Animal Sciences  Lahore
135  University of Wah  Wah Cantt
99  Women University Mardan  Mardan
228  Women University of Azad Jammu and Kashmir Bagh  Kotli
210  Women University Swabi  Swabi
30  Ziauddin University  Karachi
`;

const parsed = parseRankedUniversityLines(RAW_PAKISTAN_UNIVERSITIES);
const bulkUniversities = parsed.map((u) => buildUniversity(u));

const bySlug = new Map<string, University>();
for (const u of [...bulkUniversities, ...featuredUniversities]) {
  // featured wins when slugs collide
  bySlug.set(u.slug, u);
}

export const universities: University[] = Array.from(bySlug.values()).sort((a, b) => {
  const ar = a.rank ?? 9999;
  const br = b.rank ?? 9999;
  if (ar !== br) return ar - br;
  return a.name.localeCompare(b.name);
});

export function getUniversityBySlug(slug: string): University | null {
  return universities.find((u) => u.slug === slug) ?? null;
}

