'use strict';

const staffQuizzes = {
  specimens: {
    title: 'Specimen Detective',
    introduction: 'A specimen’s journey begins with the right patient, request and identification. Follow some fictional mix-ups and explore when to stop and ask for help.',
    insights: [
      ['Identify the patient', 'Explore how patient and specimen details are checked and matched.'],
      ['Follow the journey', 'A request, specimen site and transport arrangements can all matter.'],
      ['Ask for help', 'Consider what to do when details do not match or a procedure is unfamiliar.']
    ],
    sources: [
      ['HSSIB: Wrong patient details on a blood sample', 'https://www.hssib.org.uk/patient-safety-investigations/wrong-patient-details-on-blood-sample/'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'A specimen container and its request have different patient details. As a student, what should you do?',
        answers: ['Guess which details are correct and change the label', 'Send the specimen and hope the laboratory resolves it', 'Stop and tell your supervisor; follow the local process for an identification discrepancy', 'Ask another patient whose details look most familiar'],
        correct: 2,
        explanation: 'A mismatch risks results being linked to the wrong person. Do not guess or independently alter the label; involve your supervisor and follow the approved process.'
      },
      {
        question: 'A patient cannot tell you their identifying details before a specimen is taken. What is the safest approach?',
        answers: ['Ask your supervisor to help use the approved alternative identification process', 'Assume the person in the chair is the next name on the list', 'Skip identity checks because the clinic is busy', 'Use the name of the person who came in with them'],
        correct: 0,
        explanation: 'Identity must still be checked using an appropriate approved process. Seek support when a patient cannot confirm their own details.'
      },
      {
        question: 'Two specimens from different sites are collected from the same patient. Why are the site and request details important?',
        answers: ['The site is unimportant if both containers look alike', 'The laboratory can choose a site at random', 'Only the appointment time matters', 'They help the team match each specimen to the correct investigation and site'],
        correct: 3,
        explanation: 'Correct identification includes matching the specimen and relevant site to the request. Follow the local procedure for the specific test.'
      },
      {
        question: 'You are asked to collect a specimen, but you have not been trained in the procedure. What should you do?',
        answers: ['Proceed quickly without asking for help', 'Explain your training needs and ask your supervisor how to proceed safely', 'Copy what you saw once and work alone', 'Ask the patient to decide how to collect it'],
        correct: 1,
        explanation: 'Students should be open about their competence and work with appropriate supervision and training. Do not perform an unfamiliar procedure independently.'
      },
      {
        question: 'You are unsure how a specimen should be handled or transported to the laboratory. What is the best next step?',
        answers: ['Leave it anywhere until someone notices', 'Assume every specimen has the same requirements', 'Check the approved local laboratory guidance with your supervisor', 'Choose a container based only on its colour'],
        correct: 2,
        explanation: 'Handling, timing and transport requirements vary. Use the approved local pathway and ask the team when unsure.'
      }
    ]
  },
  aseptic: {
    title: 'Aseptic Practice',
    introduction: 'Aseptic practice calls for careful preparation, awareness and teamwork. Explore how a student can recognise a possible break in technique and involve a supervisor.',
    insights: [
      ['Prepare together', 'Discuss the procedure, equipment and supervision before taking part.'],
      ['Recognise concerns', 'Damaged packaging or an unexpected touch may need attention.'],
      ['Keep the person involved', 'Patient comfort and communication matter throughout a procedure.']
    ],
    sources: [
      ['NHS England: Infection prevention and control resources', 'https://www.england.nhs.uk/long-read/healthcare-associated-infection-hcai-compendium-of-guidance-and-resources/'],
      ['NHS England: National infection prevention and control manual', 'https://www.england.nhs.uk/infection-prevention-and-control/nipcm-for-england/']
    ],
    questions: [
      {
        question: 'Why are key parts of equipment and key sites protected during an aseptic procedure?',
        answers: ['To make the procedure look more complicated', 'To reduce the risk of introducing contamination', 'To avoid explaining the procedure to the patient', 'To replace the need for hand hygiene'],
        correct: 1,
        explanation: 'Protecting critical equipment parts and vulnerable sites helps prevent microorganisms being introduced during care.'
      },
      {
        question: 'During preparation, you notice that a sterile item’s packaging is damaged. What should you do?',
        answers: ['Use it because the item looks clean', 'Hide the damage and continue', 'Ask the patient whether it looks safe', 'Do not use it; tell your supervisor and follow the local process for replacing it'],
        correct: 3,
        explanation: 'Damaged packaging may mean the item is no longer suitable. Stop and seek guidance before continuing.'
      },
      {
        question: 'You accidentally touch a part that needs to remain aseptic. What is the best response?',
        answers: ['Stop and tell the supervising practitioner so the procedure can be made safe under local guidance', 'Continue if no one else noticed', 'Assume gloves make all contact safe', 'Wait until the patient has left before mentioning it'],
        correct: 0,
        explanation: 'A possible breach should be raised immediately. Follow the supervising practitioner and approved local procedure before continuing.'
      },
      {
        question: 'Before taking part in an aseptic procedure for the first time, what should a student do?',
        answers: ['Set up alone without checking the plan', 'Follow another clinic’s routine without checking local policy', 'Discuss the task, preparation and appropriate supervision with the practitioner', 'Assume that watching a video is a competency sign-off'],
        correct: 2,
        explanation: 'Preparation and participation depend on the procedure, local policy, training and the student’s agreed level of supervision.'
      },
      {
        question: 'A patient says they are uncomfortable while an aseptic procedure is underway. What is the most appropriate response?',
        answers: ['Ignore them until the procedure is complete', 'Pause safely, tell the supervising practitioner and support the patient', 'Tell them discomfort never matters', 'Continue without communicating with the team'],
        correct: 1,
        explanation: 'Patient comfort and communication matter alongside infection prevention. Work with the practitioner to pause and respond safely.'
      }
    ]
  },
  handover: {
    title: 'Documentation and Handover',
    introduction: 'An accurate record and a clear handover help the wider team understand what has happened and what may be needed next. Think about factual notes, confidentiality and communication.',
    insights: [
      ['Record clearly', 'Explore factual notes and what to do when an entry needs attention.'],
      ['Hand over safely', 'A structured conversation can help communicate a concern and the support needed.'],
      ['Protect access', 'Consider confidentiality and authorised access to clinical systems.']
    ],
    sources: [
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/'],
      ['NHS: SBAR implementation and training guide', 'https://www.england.nhs.uk/improvement-hub/wp-content/uploads/sites/44/2017/11/SBAR-Implementation-and-Training-Guide.pdf']
    ],
    questions: [
      {
        question: 'A patient says they feel dizzy and you notice they look pale. What would make a useful record, within your authorised role?',
        answers: ['“Patient was difficult and probably exaggerating”', '“Everything was fine” without mentioning the concern', 'A factual account of what the patient said, what you observed and who you informed', 'A diagnosis you have not been trained to make'],
        correct: 2,
        explanation: 'Clear records distinguish what the person reported from what was observed and communicate actions taken. Follow local documentation and supervision requirements.'
      },
      {
        question: 'In an SBAR handover, what does the recommendation or request help communicate?',
        answers: ['The review or help you are asking for', 'An unrelated patient’s history', 'A replacement for the patient’s identity', 'A reason to avoid telling the team your concern'],
        correct: 0,
        explanation: 'SBAR structures the situation, background, assessment and recommendation or request. Be clear about the help needed and follow local practice.'
      },
      {
        question: 'You realise you have made an entry in the wrong patient record. What should you do?',
        answers: ['Delete all traces and say nothing', 'Add more information to make the entry fit', 'Ask a friend to use their login to fix it', 'Stop, inform your supervisor and follow the approved correction and reporting process'],
        correct: 3,
        explanation: 'Report the error promptly and use the local correction process. Records must remain accurate and accountable.'
      },
      {
        question: 'You have not yet been given authorised access to the clinical system. A colleague offers to share their login. What should you do?',
        answers: ['Use it because you are both on the same team', 'Decline and ask your supervisor about the approved way to document', 'Write down their password for later', 'Take a photo of the record for your own notes'],
        correct: 1,
        explanation: 'Use only your own authorised access and follow local information governance and student documentation procedures.'
      },
      {
        question: 'A patient becomes suddenly very unwell while you are preparing a handover. What comes first?',
        answers: ['Finish writing a perfect SBAR before asking for help', 'Wait until the end of clinic to report it', 'Summon immediate help using the local emergency process, then give a clear update', 'Leave the patient alone to find their entire history'],
        correct: 2,
        explanation: 'An immediate emergency must not wait for paperwork or a complete handover. Give the team relevant information as help arrives.'
      }
    ]
  },
  wounds: {
    title: 'Wound Care and Aftercare',
    introduction: 'A patient’s comfort and understanding matter before, during and after wound care. Explore how to raise changes, ask questions and support clear aftercare with your supervisor.',
    insights: [
      ['Listen to the patient', 'Comfort and changes since the last visit are important to discuss with the team.'],
      ['Learn with support', 'Explore dressing choices and questions with a supervising practitioner.'],
      ['Plan for home', 'Consider how patients can understand their agreed aftercare and where to seek help.']
    ],
    sources: [
      ['NICE: Information and advice on wound care (QS49)', 'https://www.nice.org.uk/guidance/qs49/chapter/quality-statement-5-information-and-advice-on-wound-care'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'A patient tells you their wound has become more painful since their last visit. What should you do as a student?',
        answers: ['Assume the change is normal without telling anyone', 'Listen and report the change to your supervising practitioner for assessment', 'Choose a new treatment independently', 'Tell them pain does not matter'],
        correct: 1,
        explanation: 'A change in pain can be important. Listen, report the concern and support assessment within your competence and supervision.'
      },
      {
        question: 'A patient is going home after a procedure. What helps them understand their wound aftercare?',
        answers: ['Giving the same instructions to everyone without checking the plan', 'Avoiding questions to save time', 'Promising there will be no problems', 'Using the agreed advice and inviting them to explain what they will do and whom they can contact'],
        correct: 3,
        explanation: 'Clear, accessible advice and teach-back help identify questions. Confirm that the person knows how to seek help using the agreed local advice.'
      },
      {
        question: 'You are curious why a particular dressing was chosen. What is the best way to learn?',
        answers: ['Ask the supervising practitioner about the patient’s needs and the clinical rationale', 'Assume the same dressing suits every wound', 'Change the dressing choice yourself', 'Choose a product based on its packaging'],
        correct: 0,
        explanation: 'Dressing choices depend on assessment, the person’s needs and local guidance. Students learn the rationale with an appropriately qualified practitioner.'
      },
      {
        question: 'A patient is unsure about wound advice you have not been trained to give. What should you do?',
        answers: ['Make up an answer so they can leave sooner', 'Tell them to ignore any changes', 'Ask the supervising clinician to clarify the approved advice before the patient leaves', 'Assume they can find all the answers on social media'],
        correct: 2,
        explanation: 'Do not guess. Ask the appropriate practitioner to clarify the care plan and make sure the patient has suitable information and a contact route.'
      },
      {
        question: 'After a clinic procedure, a patient is bleeding through a dressing and becomes faint. What is your priority?',
        answers: ['Ask them to travel home alone', 'Summon immediate help using the local emergency process and stay with them, helping within your competence', 'Wait for the next routine dressing appointment', 'Finish your notes before telling anyone'],
        correct: 1,
        explanation: 'A patient who becomes acutely unwell needs immediate help. Follow the local emergency response and support the team within your role.'
      }
    ]
  },
  safeguarding: {
    title: 'Safeguarding and Speaking Up',
    introduction: 'Sometimes a patient may say or show that something is not right. Explore how to listen sensitively, share concerns appropriately and find support when someone may be at risk.',
    insights: [
      ['Listen sensitively', 'A person may tell you or show you that something does not feel right.'],
      ['Raise a concern', 'Explore how to involve the appropriate people and share information responsibly.'],
      ['Keep speaking up', 'Consider where to seek further support if a serious concern remains unresolved.']
    ],
    sources: [
      ['NHS England: Safeguarding in the NHS', 'https://www.england.nhs.uk/long-read/safeguarding-children-young-people-and-adults-at-risk-in-the-nhs/'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'A patient quietly tells you they do not feel safe at home. What is the most appropriate response?',
        answers: ['Listen sensitively, explain you may need to share the concern and promptly seek safeguarding support', 'Promise to keep everything secret from the team', 'Investigate the situation alone', 'Dismiss it because the appointment is about something else'],
        correct: 0,
        explanation: 'Listen without judgement, take the concern seriously and share it through the appropriate local safeguarding route. Do not promise absolute secrecy.'
      },
      {
        question: 'A patient’s companion answers every question and you are concerned the patient cannot speak freely. What could you do?',
        answers: ['Assume the companion always knows the patient’s wishes', 'Confront the companion with an accusation in the waiting room', 'Stop speaking to the patient', 'Seek support from your supervisor and offer a private conversation if safe and appropriate'],
        correct: 3,
        explanation: 'Support the person’s voice and privacy without making assumptions. Involve an appropriate colleague and follow local safeguarding guidance.'
      },
      {
        question: 'You notice something that makes you concerned about a child’s safety. What should you do?',
        answers: ['Wait to gather proof yourself before telling anyone', 'Discuss the concern promptly with your supervisor and follow the local child safeguarding pathway', 'Question the child repeatedly until they give the answer you expect', 'Share the details with other patients'],
        correct: 1,
        explanation: 'Share concerns promptly through the appropriate pathway. Students should not investigate independently; follow local procedures and seek immediate help for immediate danger.'
      },
      {
        question: 'How should a safeguarding concern be documented within your authorised role?',
        answers: ['Record rumours as confirmed facts', 'Put identifying details in a personal learning diary', 'Use the approved record to document relevant facts and the person’s words accurately, following local policy', 'Leave no record because the concern might be upsetting'],
        correct: 2,
        explanation: 'Accurate, factual and confidential records support a safe response. Follow local policy and supervision requirements; do not put patient identifiers in learning notes.'
      },
      {
        question: 'You have raised a serious safety concern but it remains unresolved and your supervisor is unavailable. What should you do?',
        answers: ['Give up because you have already mentioned it', 'Escalate through another appropriate local safeguarding or emergency route according to the urgency', 'Post details online to get advice', 'Wait for the next placement review'],
        correct: 1,
        explanation: 'Continue to speak up using the appropriate local route. If someone is in immediate danger, summon urgent help using the emergency process.'
      }
    ]
  },
  specialties: {
    title: 'Specialist Clinic Journeys',
    introduction: 'Outpatient nursing reaches across many specialties, each with its own patient journey. Explore communication, safe observation and learning with supervision in specialist clinics.',
    insights: [
      ['Different journeys', 'Explore fictional patient experiences across several outpatient specialties.'],
      ['Support questions', 'Listening and involving the right clinician can help when a patient is unsure.'],
      ['Learn respectfully', 'Consider patient choice, student involvement and supervision in specialist clinics.']
    ],
    sources: [
      ['NHS: Biopsy', 'https://www.nhs.uk/tests-and-treatments/biopsy/'],
      ['NHS: Rheumatoid arthritis', 'https://www.nhs.uk/conditions/rheumatoid-arthritis/'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'In a breast clinic, a patient is worried about an upcoming investigation. What is a helpful student response?',
        answers: ['Promise that the result will be normal', 'Tell them there is no reason to feel anxious', 'Listen to their concerns and help them raise questions with the appropriate clinician', 'Avoid them until the appointment is over'],
        correct: 2,
        explanation: 'Listening and helping the person access reliable information supports compassionate care without giving false reassurance or a diagnosis.'
      },
      {
        question: 'In a rheumatology clinic, a patient receiving treatment reports symptoms that may indicate an infection. What should you do?',
        answers: ['Promptly share the concern with the supervising practitioner for assessment', 'Tell the patient to change their medicine dose yourself', 'Assume the treatment makes infection impossible', 'Ignore the concern until their next routine appointment'],
        correct: 0,
        explanation: 'Some treatments may affect infection risk. Report new concerns promptly and let the appropriate clinician assess them; do not independently change medicines.'
      },
      {
        question: 'A patient in a dermatology clinic asks why a biopsy has been recommended, but you do not know their individual plan. What should you do?',
        answers: ['Guess the reason from the appearance of their skin', 'Say a biopsy always means a particular diagnosis', 'Tell them they are not allowed to ask', 'Help them ask the clinician responsible for explaining their care'],
        correct: 3,
        explanation: 'Biopsies may be used for different reasons. Support the patient’s questions and avoid guessing about an individual diagnosis or plan.'
      },
      {
        question: 'In a haematology clinic, you observe a specimen being prepared for the laboratory. What is an important learning point?',
        answers: ['Specimen identification is unnecessary in a specialist clinic', 'The team should follow the approved patient, specimen and request identification process', 'Any label can be used if the container is sealed', 'The patient’s identity can be guessed from the room number'],
        correct: 1,
        explanation: 'Correct identification and the approved specimen pathway matter in every specialty. Ask your supervisor how the local process works.'
      },
      {
        question: 'You are invited to observe a specialist procedure during placement. What should you do first?',
        answers: ['Enter without introducing yourself', 'Assume every patient must agree to a student being present', 'Explain your student role and respect the patient’s choice about your involvement', 'Offer to perform the procedure without supervision'],
        correct: 2,
        explanation: 'Patients should know who is involved in their care and can decline student involvement. Learn within your agreed role and supervision.'
      }
    ]
  }
};
