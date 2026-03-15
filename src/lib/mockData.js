// ─────────────────────────────────────────────
// PHOTOS  (realistic Unsplash portraits)
// ─────────────────────────────────────────────
export const PHOTO_URLS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85', // female 1
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85', // female 2
  'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&q=85', // female 3
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=85', // male 1
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85', // male 2
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85', // male 3
]

// ─────────────────────────────────────────────
// CURRENT USER
// ─────────────────────────────────────────────
export const CURRENT_USER = {
  id:               'user-jubin',
  name:             'Jubin Ahmed',
  age:              24,
  city:             'Dhaka',
  education:        "Bachelor's",
  heightCm:         175,
  heightDisplay:    '5 ft 9 in',
  bio:              'Just an aspiring developer looking for someone to enjoy coffee and code with.',
  relationshipGoal: 'Serious Relationship',
  personalityType:  'Ambivert',
  mbti:             'INFP',
  favoriteMusic:    'Indie Folk',
  favoriteSinger:   'Arnob',
  favoriteBand:     'Shironamhin',
  favoriteColor:    'Dusty Rose',
  hobbies:          ['Coding', 'Coffee', 'Photography'],
  interests:        ['Tech', 'Design', 'Music'],
  lookingFor:       ['Values deep conversations', 'Makes me laugh'],
  photoUrl:         PHOTO_URLS[3],
  isPremium:        false,
  profileStrength:  85,
}

// ─────────────────────────────────────────────
// MATCHES
// ─────────────────────────────────────────────
export const MOCK_MATCHES = [
  {
    id:               'match-nadia',
    name:             'Nadia Rahman',
    age:              24,
    city:             'Dhaka',
    education:        "Bachelor's",
    heightCm:         162,
    heightDisplay:    '5 ft 4 in',
    bio:              'Architecture student who sketches strangers in cafes. Obsessed with old Dhaka and rainy evenings.',
    relationshipGoal: 'Serious Relationship',
    personalityType:  'Introvert',
    favoriteMusic:    'Classical Bangla',
    favoriteSinger:   'Rabindranath',
    favoriteBand:     'Chirkutt',
    favoriteColor:    'Dusty Rose',
    hobbies:          ['Reading', 'Travel', 'Art'],
    interests:        ['Music', 'Movies', 'Architecture'],
    photoUrl:         PHOTO_URLS[0],
    score:            92,
    chatId:           'chat-nadia',
  },
  {
    id:               'match-tasnim',
    name:             'Tasnim Akter',
    age:              22,
    city:             'Chittagong',
    education:        "Bachelor's",
    heightCm:         158,
    heightDisplay:    '5 ft 2 in',
    bio:              'Marine biology enthusiast with a thing for sunset photography. Tea over coffee, always.',
    relationshipGoal: 'Serious Relationship',
    personalityType:  'Ambivert',
    favoriteMusic:    'Indie Pop',
    favoriteSinger:   'Anupam Roy',
    favoriteBand:     'Fossils',
    favoriteColor:    'Ocean Blue',
    hobbies:          ['Photography', 'Hiking', 'Cooking'],
    interests:        ['Nature', 'Science', 'Food'],
    photoUrl:         PHOTO_URLS[1],
    score:            87,
    chatId:           'chat-tasnim',
  },
  {
    id:               'match-priya',
    name:             'Priya Sen',
    age:              25,
    city:             'Sylhet',
    education:        "Master's",
    heightCm:         165,
    heightDisplay:    '5 ft 5 in',
    bio:              'Software engineer by day, bookworm by night. Looking for someone who debates philosophy over chai.',
    relationshipGoal: 'Serious Relationship',
    personalityType:  'Introvert',
    favoriteMusic:    'Jazz',
    favoriteSinger:   'Mitu',
    favoriteBand:     'Black',
    favoriteColor:    'Forest Green',
    hobbies:          ['Reading', 'Gaming', 'Cycling'],
    interests:        ['Technology', 'Philosophy', 'Design'],
    photoUrl:         PHOTO_URLS[2],
    score:            83,
    chatId:           'chat-priya',
  },
]

// ─────────────────────────────────────────────
// APPROACHES
// ─────────────────────────────────────────────
export const MOCK_APPROACHES = [
  {
    id:          'approach-sabrina',
    senderId:    'match-nadia',
    senderName:  'Sabrina',
    senderCity:  'Dhaka',
    senderAge:   25,
    senderPhoto: PHOTO_URLS[1],
    message:     'Your answer about the perfect weekend really resonated with me. I also love trying out new cafés.',
    time:        '20:52',
    chatId:      'chat-sabrina',
  },
  {
    id:          'approach-fahim',
    senderId:    'match-tasnim',
    senderName:  'Fahim',
    senderCity:  'Sylhet',
    senderAge:   29,
    senderPhoto: PHOTO_URLS[4],
    message:     'We seem to have a lot of common interests! Would love to chat.',
    time:        '18:57',
    chatId:      'chat-fahim',
  },
]

// ─────────────────────────────────────────────
// CHATS
// ─────────────────────────────────────────────
export const MOCK_CHATS = [
  {
    id:           'chat-priya',
    matchId:      'match-priya',
    matchName:    'Priya Sen',
    matchPhoto:   PHOTO_URLS[2],
    matchCity:    'Sylhet',
    isOnline:     true,
    lastMessage:  'What book are you reading right now?',
    lastTime:     '21:02',
    unread:       1,
    winkSent:     false,
    mutualWink:   false,
    messages: [
      { id: 'm1', text: 'Hey Jubin! Thanks for the approach.',                          isMine: false, time: '20:57' },
      { id: 'm2', text: 'Hey! Glad we matched. What book are you reading right now?',   isMine: true,  time: '21:02' },
    ],
  },
  {
    id:           'chat-nadia',
    matchId:      'match-nadia',
    matchName:    'Nadia Rahman',
    matchPhoto:   PHOTO_URLS[0],
    matchCity:    'Dhaka',
    isOnline:     false,
    lastMessage:  'Haha same! Old Dhaka is magical 🌙',
    lastTime:     'Yesterday',
    unread:       0,
    winkSent:     true,
    mutualWink:   false,
    messages: [
      { id: 'm1', text: "I've always wanted to sketch the streets of Puran Dhaka!", isMine: true,  time: '18:30' },
      { id: 'm2', text: 'Haha same! Old Dhaka is magical 🌙',                       isMine: false, time: '18:45' },
    ],
  },
]

// ─────────────────────────────────────────────
// FORM OPTIONS
// ─────────────────────────────────────────────
export const RELATIONSHIP_GOALS = [
  'Serious Relationship', 'Casual Dating', 'Friendship', 'Not Sure Yet',
]

export const PERSONALITY_TYPES = ['Introvert', 'Extrovert', 'Ambivert']

export const HOBBY_OPTIONS = [
  'Travel','Reading','Gaming','Cooking','Sports','Photography',
  'Music','Art','Fashion','Technology','Fitness','Movies',
  'Volunteering','Meditation','Cycling','Dancing','Coffee',
]

export const INTEREST_OPTIONS = [
  'Music','Movies','Fitness','Technology','Art','Science',
  'Food','Nature','Business','Education','Philosophy','Design','Startups',
]

export const LOOKING_FOR_OPTIONS = [
  'Values deep conversations','Shares my interests',
  'Makes me laugh','Is ambitious','Is family-oriented','Loves adventure',
]
