import type { StressCategory, CategoryQuestionConfig } from '../types';


export const STRESS_CATEGORIES: StressCategory[] = [
  {
    id: 'exams',
    title: 'Exam stress',
    subtitle: 'Tests, marks and revision',
    iconName: 'BookOpenCheck',
  },
  {
    id: 'studies',
    title: 'Study pressure',
    subtitle: 'Homework and concentration',
    iconName: 'Clock3',
  },
  {
    id: 'friends',
    title: 'Friends',
    subtitle: 'Friendship and fitting in',
    iconName: 'Users',
  },
  {
    id: 'family',
    title: 'Family',
    subtitle: 'Expectations and conflicts',
    iconName: 'Home',
  },
  {
    id: 'confidence',
    title: 'Self-confidence',
    subtitle: 'Self-doubt and comparison',
    iconName: 'Sparkles',
  },
  {
    id: 'other',
    title: 'Something else',
    subtitle: 'Describe your concern',
    iconName: 'HeartHandshake',
  },
];

export const CATEGORY_QUESTIONS: Record<string, CategoryQuestionConfig> = {
  exams: {
    categoryId: 'exams',
    optionalTextPrompt: 'Want to mention a specific subject or test? (Optional)',
    optionalTextPlaceholder: 'e.g., Math finals next Tuesday, or Biology chapter 4...',
    questions: [
      {
        id: 'exam_worry',
        prompt: 'What worries you most about exams?',
        description: 'Choose the option that best describes how you feel.',
        options: [
          { id: 'low_marks', label: "I'm afraid of getting low marks" },
          { id: 'forget_stuff', label: 'I study but forget during exams' },
          { id: 'lack_time', label: "I don't have enough time to prepare" },
          { id: 'expectations', label: "I'm worried about others' expectations" },
        ],
      },
      {
        id: 'frequency',
        prompt: 'How often do you feel this way?',
        description: 'Notice how this has been showing up in your day-to-day routine.',
        options: [
          { id: 'sometimes', label: 'Sometimes' },
          { id: 'often', label: 'Often' },
          { id: 'everyday', label: 'Almost every day' },
        ],
      },
      {
        id: 'desired_help',
        prompt: 'What would help you most right now?',
        description: 'We will tailor your guide based on this primary need.',
        options: [
          { id: 'study_plan', label: 'A simple study plan' },
          { id: 'calm_mind', label: 'Ways to calm my mind' },
          { id: 'build_confidence', label: 'Building confidence' },
          { id: 'little_everything', label: 'A little of everything' },
        ],
      },
    ],
  },
  studies: {
    categoryId: 'studies',
    optionalTextPrompt: 'Is there a specific homework or deadline piling up? (Optional)',
    optionalTextPlaceholder: 'e.g., Physics project due Friday, can’t stop checking Instagram...',
    questions: [
      {
        id: 'study_draining',
        prompt: 'What makes studying feel the most draining?',
        description: 'Be honest with where the friction is coming from.',
        options: [
          { id: 'concentration', label: 'Hard to concentrate or put my phone down' },
          { id: 'workload_mountain', label: 'The mountain of homework feels never-ending' },
          { id: 'behind_schedule', label: 'Feeling behind and not knowing where to begin' },
          { id: 'sleep_exhaustion', label: 'Staying up late and feeling exhausted' },
        ],
      },
      {
        id: 'study_timing',
        prompt: 'When does this stress hit you the hardest?',
        description: 'Pinpointing the moment helps us break the cycle.',
        options: [
          { id: 'after_school', label: 'Right after school sitting down to start' },
          { id: 'late_evening', label: 'Late at night before trying to sleep' },
          { id: 'in_class', label: 'During class when teachers assign more' },
          { id: 'sunday_blues', label: 'On Sunday evenings anticipating Monday' },
        ],
      },
      {
        id: 'study_desired_help',
        prompt: 'What kind of approach feels doable today?',
        description: 'Pick something realistic rather than overwhelming.',
        options: [
          { id: 'micro_start', label: 'A low-effort 15-minute start technique' },
          { id: 'phone_focus', label: 'Help tackling phone and screen distractions' },
          { id: 'clear_checklist', label: 'A simple checklist to regain control' },
          { id: 'mental_reassurance', label: 'Gentle reassurance and stress release' },
        ],
      },
    ],
  },
  friends: {
    categoryId: 'friends',
    optionalTextPrompt: 'Anything specific you want to vent or share? (Optional & private)',
    optionalTextPlaceholder: 'e.g., Felt excluded during lunchtime group chat...',
    questions: [
      {
        id: 'friend_concern',
        prompt: 'What is on your mind regarding friendships?',
        description: 'School social dynamics can be tricky and exhausting.',
        options: [
          { id: 'excluded', label: 'Feeling left out or excluded from a group' },
          { id: 'argument', label: 'A misunderstanding or fight with a close friend' },
          { id: 'masking', label: 'Pressure to act like someone I’m not to fit in' },
          { id: 'unseen', label: 'Feeling like nobody really gets who I am' },
        ],
      },
      {
        id: 'friend_impact',
        prompt: 'How is this affecting you during the day?',
        description: 'Check how it ripples through your mood.',
        options: [
          { id: 'break_loneliness', label: 'Makes lunch breaks feel lonely or awkward' },
          { id: 'class_distraction', label: 'Distracts me from focusing in class' },
          { id: 'school_dread', label: 'Makes me dread going to school in the morning' },
          { id: 'periodic', label: 'It comes and goes in waves' },
        ],
      },
      {
        id: 'friend_desired_help',
        prompt: 'What would bring you the most peace right now?',
        description: 'Choose the support that feels most validating.',
        options: [
          { id: 'handle_exclusion', label: 'Knowing how to handle feelings of being excluded' },
          { id: 'calm_dialogue', label: 'Steps to talk things out without conflict' },
          { id: 'self_worth', label: 'Reminding myself of my worth outside the group' },
          { id: 'protect_energy', label: 'Ways to protect my energy and stay grounded' },
        ],
      },
    ],
  },
  family: {
    categoryId: 'family',
    optionalTextPrompt: 'Anything you wish your family understood? (Optional)',
    optionalTextPlaceholder: 'e.g., They constantly compare me to my older sibling...',
    questions: [
      {
        id: 'family_tension',
        prompt: 'What is creating tension at home?',
        description: 'Home should feel safe, but expectations can be heavy.',
        options: [
          { id: 'high_standards', label: 'High expectations about grades or career paths' },
          { id: 'comparisons', label: 'Constant comparing with siblings or relatives' },
          { id: 'arguments', label: 'Frequent arguments or a tense atmosphere at home' },
          { id: 'misunderstood', label: 'Feeling like my parents don’t understand my reality' },
        ],
      },
      {
        id: 'family_somatic',
        prompt: 'How does this pressure feel inside your mind and body?',
        description: 'Notice what rises up when this topic comes up.',
        options: [
          { id: 'disappointment_fear', label: 'A heavy weight of not wanting to disappoint them' },
          { id: 'shut_down', label: 'Frustration and wanting to shut down in my room' },
          { id: 'report_anxiety', label: 'Anxiety whenever report cards or marks are brought up' },
          { id: 'exhausted_explaining', label: 'Tired of constantly having to defend or explain myself' },
        ],
      },
      {
        id: 'family_desired_help',
        prompt: 'What support would help you navigate this?',
        description: 'We will focus on what is within your control.',
        options: [
          { id: 'calm_scripts', label: 'Gentle scripts to talk to parents without arguing' },
          { id: 'separate_worth', label: 'Ways to separate my self-worth from family approval' },
          { id: 'mental_sanctuary', label: 'Creating a quiet mental sanctuary for myself' },
          { id: 'own_pace', label: 'Reassurance that it’s okay to have my own pace' },
        ],
      },
    ],
  },
  confidence: {
    categoryId: 'confidence',
    optionalTextPrompt: 'Is there a situation that triggered this self-doubt? (Optional)',
    optionalTextPlaceholder: 'e.g., Classroom presentation coming up, or getting a lower score than expected...',
    questions: [
      {
        id: 'confidence_source',
        prompt: 'Where is self-doubt showing up most right now?',
        description: 'Recognizing where the doubt hides helps disarm it.',
        options: [
          { id: 'comparison_trap', label: 'Comparing myself to classmates who seem to have it all together' },
          { id: 'fear_of_judgment', label: 'Fear of speaking up in class or making mistakes in public' },
          { id: 'imposter_feeling', label: 'Feeling like I’m never “smart enough” or “good enough”' },
          { id: 'harsh_critic', label: 'An inner critic that magnifies every small flaw' },
        ],
      },
      {
        id: 'confidence_pattern',
        prompt: 'How long has this been feeling heavy?',
        description: 'Helping us gauge whether this is an acute spike or long-standing pattern.',
        options: [
          { id: 'recent_setback', label: 'Just recently after a specific setback or mark' },
          { id: 'event_spikes', label: 'It flares up around tests, presentations, or social events' },
          { id: 'quiet_voice', label: 'It’s been a persistent quiet voice for months' },
          { id: 'fluctuates', label: 'It fluctuates depending on my energy levels' },
        ],
      },
      {
        id: 'confidence_desired_help',
        prompt: 'What shift would feel most liberating right now?',
        description: 'Choose the mindset transition you need today.',
        options: [
          { id: 'silence_critic', label: 'Learning how to silence the harsh inner critic' },
          { id: 'mistake_courage', label: 'Building courage to make mistakes without shame' },
          { id: 'hidden_strengths', label: 'A practical exercise to recognize my hidden strengths' },
          { id: 'behind_the_scenes', label: 'Learning to stop comparing my behind-the-scenes to others’ highlights' },
        ],
      },
    ],
  },
  other: {
    categoryId: 'other',
    optionalTextPrompt: 'What’s been weighing on you? (Write as much or as little as you like)',
    optionalTextPlaceholder: 'Describe what’s going on in your own words. It is completely safe and private...',
    questions: [
      {
        id: 'other_intensity',
        prompt: 'How heavy does this feel right now?',
        description: 'Take a slow breath and check in with your current energy.',
        options: [
          { id: 'nagging_worry', label: 'A nagging worry in the back of my mind' },
          { id: 'heavy_drain', label: 'Quite heavy and draining my motivation' },
          { id: 'overwhelming', label: 'Overwhelming and making it hard to focus on today' },
          { id: 'space_to_sort', label: 'Just need a safe space to sort through my thoughts' },
        ],
      },
      {
        id: 'other_desired_help',
        prompt: 'What would feel like a breath of fresh air today?',
        description: 'What kind of support would feel most comforting?',
        options: [
          { id: 'calming_perspective', label: 'A step-by-step calming perspective' },
          { id: 'reset_exercise', label: 'A simple reset activity I can do right now' },
          { id: 'validation', label: 'Validating my feelings without judgment' },
          { id: 'next_small_step', label: 'Practical guidance on taking the next small step' },
        ],
      },
    ],
  },
};
