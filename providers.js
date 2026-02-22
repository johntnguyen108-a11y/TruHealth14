
// providers.fixed.js
// Provider data for TruHealth (sample/demo). All names are fictitious.

// Helper reviews (kept generic and non-defamatory)
const makeCautionReview = (specialtyName) => ({
  reviewer: "Independent Peer Review",
  date: "3 weeks ago",
  rating: 2,
  text: `Lower patient satisfaction reported for this ${specialtyName}. Consider verifying credentials and recent outcomes before booking.`
});

// Chiropractors
const chiropractors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell, DC",
    specialty: "chiropractic",
    specialtyName: "Chiropractic Care",
    experience: 15,
    price: 45,
    distance: 1.2,
    availability: "same-day",
    rating: 4.9,
    reviews: 287,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
    about: "Board-certified chiropractor specializing in sports injuries and chronic pain management.",
    address: "123 Wellness Dr, Suite 200",
    phone: "(555) 234-5678",
    insurance: "In-Network",
    medicalSchool: "Palmer College of Chiropractic",
    boardCert: "National Board of Chiropractic Examiners (NBCE)",
    professionalReviews: [
      { reviewer: "Dr. James Patterson, MD", date: "1 month ago", rating: 5, text: "Consistently excellent outcomes for post-surgical rehab. Great communication with referring physicians." }
    ]
  },
  {
    id: 2,
    name: "Dr. Marcus Thompson, DC",
    specialty: "chiropractic",
    specialtyName: "Chiropractic Care",
    experience: 8,
    price: 75,
    distance: 4.5,
    availability: "next-day",
    rating: 4.3,
    reviews: 134,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #43a047 0%, #2e7d32 100%)",
    about: "Specializes in workplace ergonomics and occupational injury prevention.",
    address: "890 Corporate Plaza, Floor 3",
    phone: "(555) 345-6789",
    insurance: "Out-of-Network",
    medicalSchool: "Logan University",
    boardCert: "American Chiropractic Board of Sports Physicians (ACBSP)",
    professionalReviews: [
      { reviewer: "Dr. Susan Rodriguez, DO", date: "2 weeks ago", rating: 4, text: "Solid results for ergonomic injuries; pricing is higher than average, but patients report improvements." }
    ]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez, DC",
    specialty: "chiropractic",
    specialtyName: "Chiropractic Care",
    experience: 12,
    price: 55,
    distance: 2.8,
    availability: "same-day",
    rating: 5.0,
    reviews: 421,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #1e88e5 0%, #43a047 100%)",
    about: "Prenatal and postnatal chiropractic care specialist.",
    address: "456 Family Health Center",
    phone: "(555) 456-7890",
    insurance: "In-Network",
    medicalSchool: "Life University",
    boardCert: "International Chiropractic Pediatric Association (ICPA)",
    professionalReviews: [
      { reviewer: "Dr. Amanda Foster, MD (OB-GYN)", date: "5 days ago", rating: 5, text: "Highly recommended for prenatal back pain; patients report faster recovery and improved comfort." }
    ]
  },
  {
    id: 4,
    name: "Dr. Howard (Sample)",
    specialty: "chiropractic",
    specialtyName: "Chiropractic Care",
    experience: 3,
    price: 35,
    distance: 8.1,
    availability: "this-week",
    rating: 3.0,
    reviews: 156,
    avatar: "👨",
    gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
    about: "Budget-friendly chiropractic services.",
    address: "999 Budget Medical Strip Mall",
    phone: "(555) 999-0000",
    insurance: "Limited Plans",
    medicalSchool: "Online Certification",
    boardCert: "None",
    professionalReviews: [makeCautionReview('Chiropractic Care')]
  }
];

// Therapists
const therapists = [
  {
    id: 201,
    name: "Dr. Jennifer Matthews, PsyD",
    specialty: "therapy",
    specialtyName: "Therapy/Counseling",
    experience: 16,
    price: 120,
    distance: 3.2,
    availability: "next-day",
    rating: 4.9,
    reviews: 234,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
    about: "Licensed psychologist specializing in cognitive behavioral therapy.",
    address: "123 Mental Health Plaza",
    phone: "(555) 111-2222",
    insurance: "Out-of-Network",
    medicalSchool: "Psy.D. Clinical Psychology",
    boardCert: "Licensed Psychologist",
    professionalReviews: [
      { reviewer: "Dr. Amanda Foster, MD", date: "2 weeks ago", rating: 5, text: "Evidence-based CBT, excellent outcomes. Often a short waitlist." }
    ]
  },
  {
    id: 202,
    name: "Michael Rodriguez, LMFT",
    specialty: "therapy",
    specialtyName: "Therapy/Counseling",
    experience: 11,
    price: 85,
    distance: 2.5,
    availability: "same-day",
    rating: 4.7,
    reviews: 189,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
    about: "Marriage and family therapist.",
    address: "456 Relationship Center",
    phone: "(555) 222-3333",
    insurance: "In-Network",
    medicalSchool: "M.A. Marriage and Family Therapy",
    boardCert: "LMFT",
    professionalReviews: [
      { reviewer: "Dr. Lisa Chen, PsyD", date: "1 week ago", rating: 5, text: "Strong couples work using Gottman Method; accessible pricing." }
    ]
  },
  {
    id: 203,
    name: "Dr. Sarah Johnson, PhD",
    specialty: "therapy",
    specialtyName: "Therapy/Counseling",
    experience: 22,
    price: 150,
    distance: 7.8,
    availability: "this-week",
    rating: 4.8,
    reviews: 412,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
    about: "Trauma specialist, EMDR certified.",
    address: "789 Trauma Recovery Center",
    phone: "(555) 333-4444",
    insurance: "Out-of-Network",
    medicalSchool: "Ph.D. Clinical Psychology",
    boardCert: "EMDR Certified",
    professionalReviews: [
      { reviewer: "Dr. James Patterson, MD", date: "5 days ago", rating: 5, text: "Strong outcomes for PTSD; premium pricing but high value for complex cases." }
    ]
  },
  {
    id: 204,
    name: "Dr. Howard (Sample)",
    specialty: "therapy",
    specialtyName: "Therapy/Counseling",
    experience: 3,
    price: 35,
    distance: 9.2,
    availability: "this-week",
    rating: 3.0,
    reviews: 143,
    avatar: "👨",
    gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
    about: "Budget-friendly counseling services.",
    address: "999 Budget Medical Strip Mall",
    phone: "(555) 999-0000",
    insurance: "Limited Plans",
    medicalSchool: "Online Certification",
    boardCert: "None",
    professionalReviews: [makeCautionReview('Therapy/Counseling')]
  }
];

// Family Doctors
const familyDoctors = [
  {
    id: 101,
    name: "Dr. Maria Santos, MD",
    specialty: "family",
    specialtyName: "Family Medicine",
    experience: 18,
    price: 45,
    distance: 2.1,
    availability: "next-day",
    rating: 4.9,
    reviews: 523,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
    about: "Board-certified family physician.",
    address: "890 Primary Care Center",
    phone: "(555) 789-0123",
    insurance: "In-Network",
    medicalSchool: "Harvard Medical School",
    residency: "Mass General Hospital",
    boardCert: "American Board of Family Medicine",
    professionalReviews: [
      { reviewer: "Dr. John Miller, MD", date: "2 weeks ago", rating: 5, text: "Manages complex patients exceptionally well; consistent quality." }
    ]
  },
  {
    id: 102,
    name: "Dr. James Wilson, MD",
    specialty: "family",
    specialtyName: "Family Medicine",
    experience: 9,
    price: 50,
    distance: 5.4,
    availability: "this-week",
    rating: 4.4,
    reviews: 187,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #43a047 0%, #2e7d32 100%)",
    about: "Evidence-based physician.",
    address: "234 Wellness Medical Group",
    phone: "(555) 890-1234",
    insurance: "Limited Networks",
    medicalSchool: "Johns Hopkins School of Medicine",
    residency: "Mayo Clinic",
    boardCert: "American Board of Family Medicine",
    professionalReviews: [
      { reviewer: "Dr. Susan Taylor, MD", date: "1 week ago", rating: 4, text: "Academically strong; slightly longer wait times during peak hours." }
    ]
  },
  {
    id: 103,
    name: "Dr. Rachel Cohen, MD",
    specialty: "family",
    specialtyName: "Family Medicine",
    experience: 14,
    price: 45,
    distance: 1.9,
    availability: "same-day",
    rating: 4.8,
    reviews: 356,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #1e88e5 0%, #43a047 100%)",
    about: "Women's health and pediatrics specialist.",
    address: "567 Community Health Center",
    phone: "(555) 901-2345",
    insurance: "In-Network",
    medicalSchool: "Stanford School of Medicine",
    residency: "UCSF Medical Center",
    boardCert: "American Board of Family Medicine",
    professionalReviews: [
      { reviewer: "Dr. Michael Torres, MD", date: "10 days ago", rating: 5, text: "Excellent pediatric care and early detection for developmental issues." }
    ]
  },
  {
    id: 104,
    name: "Dr. Howard (Sample)",
    specialty: "family",
    specialtyName: "Family Medicine",
    experience: 3,
    price: 35,
    distance: 8.7,
    availability: "this-week",
    rating: 3.0,
    reviews: 178,
    avatar: "👨",
    gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
    about: "Budget-friendly primary care services.",
    address: "999 Budget Medical Strip Mall",
    phone: "(555) 999-0000",
    insurance: "Limited Plans",
    medicalSchool: "Online Certification",
    boardCert: "None",
    professionalReviews: [makeCautionReview('Family Medicine')]
  }
];

// Orthodontists
const orthodontists = [
  {
    id: 301,
    name: "Dr. Jennifer Park, DDS, MS",
    specialty: "orthodontist",
    specialtyName: "Orthodontist",
    experience: 14,
    price: 150,
    distance: 2.3,
    availability: "next-day",
    rating: 4.9,
    reviews: 342,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
    about: "Specializes in Invisalign and modern orthodontic treatments for teens and adults.",
    address: "234 Smile Avenue, Suite 5",
    phone: "(555) 111-2222",
    insurance: "In-Network",
    medicalSchool: "Harvard School of Dental Medicine",
    boardCert: "American Board of Orthodontics",
    professionalReviews: [
      { reviewer: "Dr. Thomas Wright, DDS", date: "2 weeks ago", rating: 5, text: "Excellent for complex alignment cases; strong Invisalign outcomes." }
    ]
  },
  {
    id: 302,
    name: "Dr. Michael Torres, DMD",
    specialty: "orthodontist",
    specialtyName: "Orthodontist",
    experience: 22,
    price: 175,
    distance: 5.1,
    availability: "this-week",
    rating: 4.7,
    reviews: 589,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
    about: "Traditional braces specialist with over 20 years of experience.",
    address: "567 Dental Plaza, 2nd Floor",
    phone: "(555) 222-3333",
    insurance: "Most Plans Accepted",
    medicalSchool: "University of Pennsylvania School of Dental Medicine",
    boardCert: "American Board of Orthodontics",
    professionalReviews: [
      { reviewer: "Dr. Sarah Johnson, DDS", date: "1 month ago", rating: 5, text: "Great results for severe overbites; premium pricing." }
    ]
  },
  {
    id: 303,
    name: "Dr. Rachel Kim, DDS, MS",
    specialty: "orthodontist",
    specialtyName: "Orthodontist",
    experience: 9,
    price: 125,
    distance: 3.7,
    availability: "same-day",
    rating: 4.8,
    reviews: 267,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
    about: "Pediatric orthodontist specializing in early intervention.",
    address: "890 Kids Dental Center",
    phone: "(555) 333-4444",
    insurance: "In-Network",
    medicalSchool: "Columbia University College of Dental Medicine",
    boardCert: "American Board of Orthodontics",
    professionalReviews: [
      { reviewer: "Dr. Lisa Martinez, DDS (Pediatric)", date: "10 days ago", rating: 5, text: "Great with children; prevents extensive work later via early care." }
    ]
  },
  {
    id: 304,
    name: "Dr. Howard (Sample)",
    specialty: "orthodontist",
    specialtyName: "Orthodontist",
    experience: 3,
    price: 35,
    distance: 9.5,
    availability: "this-week",
    rating: 3.0,
    reviews: 201,
    avatar: "👨",
    gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
    about: "Budget-friendly orthodontic services.",
    address: "999 Budget Medical Strip Mall",
    phone: "(555) 999-0000",
    insurance: "Limited Plans",
    medicalSchool: "Online Certification",
    boardCert: "None",
    professionalReviews: [makeCautionReview('Orthodontist')]
  }
];

// Dentists
const dentists = [
  {
    id: 401,
    name: "Dr. Robert Anderson, DDS",
    specialty: "dentist",
    specialtyName: "General Dentist",
    experience: 18,
    price: 95,
    distance: 1.5,
    availability: "same-day",
    rating: 4.9,
    reviews: 512,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #00acc1 0%, #0097a7 100%)",
    about: "Comprehensive family dentistry with focus on preventive care.",
    address: "123 Main Street Dental",
    phone: "(555) 444-5555",
    insurance: "In-Network",
    medicalSchool: "NYU College of Dentistry",
    boardCert: "Academy of General Dentistry",
    professionalReviews: [
      { reviewer: "Dr. Emily Chen, DMD", date: "2 weeks ago", rating: 5, text: "Excellent preventive care; high patient satisfaction." }
    ]
  },
  {
    id: 402,
    name: "Dr. Maria Santos, DDS",
    specialty: "dentist",
    specialtyName: "General Dentist",
    experience: 12,
    price: 110,
    distance: 4.2,
    availability: "next-day",
    rating: 4.7,
    reviews: 389,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #00acc1 0%, #0097a7 100%)",
    about: "Specializes in cosmetic dentistry and smile makeovers.",
    address: "456 Cosmetic Dental Suite",
    phone: "(555) 555-6666",
    insurance: "Out-of-Network",
    medicalSchool: "UCSF School of Dentistry",
    boardCert: "American Academy of Cosmetic Dentistry",
    professionalReviews: [
      { reviewer: "Dr. James Wilson, DDS", date: "3 weeks ago", rating: 5, text: "Outstanding veneer work; long-lasting results reported." }
    ]
  },
  {
    id: 403,
    name: "Dr. David Lee, DMD",
    specialty: "dentist",
    specialtyName: "General Dentist",
    experience: 25,
    price: 85,
    distance: 2.9,
    availability: "same-day",
    rating: 4.8,
    reviews: 678,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #00acc1 0%, #0097a7 100%)",
    about: "Experienced general dentist focused on gentle care.",
    address: "789 Gentle Dental Care",
    phone: "(555) 666-7777",
    insurance: "Most Plans",
    medicalSchool: "Boston University Goldman School of Dental Medicine",
    boardCert: "American Dental Association",
    professionalReviews: [
      { reviewer: "Dr. Patricia Moore, DDS", date: "1 week ago", rating: 5, text: "Great diagnostics; affordable pricing." }
    ]
  },
  {
    id: 404,
    name: "Dr. Howard (Sample)",
    specialty: "dentist",
    specialtyName: "General Dentist",
    experience: 3,
    price: 35,
    distance: 8.9,
    availability: "this-week",
    rating: 3.0,
    reviews: 192,
    avatar: "👨",
    gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
    about: "Budget-friendly dental services.",
    address: "999 Budget Medical Strip Mall",
    phone: "(555) 999-0000",
    insurance: "Limited Plans",
    medicalSchool: "Online Certification",
    boardCert: "None",
    professionalReviews: [makeCautionReview('General Dentistry')]
  }
];

// Optometrists
const optometrists = [
  {
    id: 501,
    name: "Dr. Amanda Foster, OD",
    specialty: "optometrist",
    specialtyName: "Optometrist",
    experience: 16,
    price: 120,
    distance: 2.1,
    availability: "next-day",
    rating: 4.9,
    reviews: 445,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #ff6f00 0%, #e65100 100%)",
    about: "Specializes in contact lens fittings and comprehensive eye exams.",
    address: "234 Vision Center",
    phone: "(555) 777-8888",
    insurance: "In-Network",
    medicalSchool: "New England College of Optometry",
    boardCert: "American Board of Optometry",
    professionalReviews: [
      { reviewer: "Dr. Steven Park, MD (Ophthalmology)", date: "2 weeks ago", rating: 5, text: "Preferred optometrist for pre-surgical evaluations; catches early issues." }
    ]
  },
  {
    id: 502,
    name: "Dr. Christopher Davis, OD",
    specialty: "optometrist",
    specialtyName: "Optometrist",
    experience: 11,
    price: 100,
    distance: 3.8,
    availability: "same-day",
    rating: 4.7,
    reviews: 312,
    avatar: "👨‍⚕️",
    gradient: "linear-gradient(135deg, #ff6f00 0%, #e65100 100%)",
    about: "Pediatric optometry and vision therapy specialist.",
    address: "567 Kids Vision Clinic",
    phone: "(555) 888-9999",
    insurance: "Most Plans",
    medicalSchool: "Southern College of Optometry",
    boardCert: "American Board of Optometry",
    professionalReviews: [
      { reviewer: "Dr. Rachel Thompson, MD (Pediatrics)", date: "1 month ago", rating: 5, text: "Great with kids; strong improvements reported with vision therapy." }
    ]
  },
  {
    id: 503,
    name: "Dr. Nicole Martinez, OD",
    specialty: "optometrist",
    specialtyName: "Optometrist",
    experience: 20,
    price: 140,
    distance: 5.5,
    availability: "this-week",
    rating: 4.8,
    reviews: 567,
    avatar: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #ff6f00 0%, #e65100 100%)",
    about: "Specializes in difficult prescriptions and progressive lenses.",
    address: "890 Advanced Eye Care",
    phone: "(555) 999-0000",
    insurance: "Out-of-Network",
    medicalSchool: "Illinois College of Optometry",
    boardCert: "American Board of Optometry",
    professionalReviews: [
      { reviewer: "Dr. Michael Roberts, OD", date: "3 weeks ago", rating: 5, text: "Handles complex cases very well; higher pricing but excellent outcomes." }
    ]
  },
  {
    id: 504,
    name: "Dr. Howard (Sample)",
    specialty: "optometrist",
    specialtyName: "Optometrist",
    experience: 3,
    price: 35,
    distance: 9.8,
    availability: "this-week",
    rating: 3.0,
    reviews: 167,
    avatar: "👨",
    gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
    about: "Budget-friendly optometry services.",
    address: "999 Budget Medical Strip Mall",
    phone: "(555) 999-0000",
    insurance: "Limited Plans",
    medicalSchool: "Online Certification",
    boardCert: "None",
    professionalReviews: [makeCautionReview('Optometry')]
  }
];

// Gather all providers (for call/chat screen)
const allProviders = [
  ...chiropractors,
  ...therapists,
  ...familyDoctors,
  ...orthodontists,
  ...dentists,
  ...optometrists
];

// Insurance acceptance (sample)
chiropractors[0].acceptedInsurance = ['bluecross', 'unitedhealthcare'];
chiropractors[1].acceptedInsurance = ['bluecross', 'aetna'];
chiropractors[2].acceptedInsurance = ['bluecross', 'unitedhealthcare', 'aetna'];
chiropractors[3].acceptedInsurance = ['aetna'];

therapists[0].acceptedInsurance = ['bluecross', 'aetna'];
therapists[1].acceptedInsurance = ['bluecross', 'unitedhealthcare'];
therapists[2].acceptedInsurance = ['bluecross'];
therapists[3].acceptedInsurance = [];

familyDoctors[0].acceptedInsurance = ['bluecross', 'unitedhealthcare', 'aetna'];
familyDoctors[1].acceptedInsurance = ['bluecross', 'unitedhealthcare'];
familyDoctors[2].acceptedInsurance = ['bluecross', 'aetna'];
familyDoctors[3].acceptedInsurance = ['unitedhealthcare'];

orthodontists[0].acceptedInsurance = ['bluecross', 'unitedhealthcare'];
orthodontists[1].acceptedInsurance = ['bluecross', 'aetna'];
orthodontists[2].acceptedInsurance = ['bluecross', 'unitedhealthcare', 'aetna'];
orthodontists[3].acceptedInsurance = [];

dentists[0].acceptedInsurance = ['bluecross', 'unitedhealthcare', 'aetna'];
dentists[1].acceptedInsurance = ['bluecross', 'unitedhealthcare'];
dentists[2].acceptedInsurance = ['bluecross', 'aetna'];
dentists[3].acceptedInsurance = ['bluecross'];

optometrists[0].acceptedInsurance = ['bluecross', 'unitedhealthcare'];
optometrists[1].acceptedInsurance = ['bluecross', 'aetna'];
optometrists[2].acceptedInsurance = ['bluecross'];
optometrists[3].acceptedInsurance = ['unitedhealthcare'];

console.log('✅ providers loaded');
