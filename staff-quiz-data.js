'use strict';

const staffQuizzes = {
  clinic: {
    title: 'A Busy Clinic Shift',
    introduction: 'Practise prioritising, communicating and handing over safely during a fictional outpatient clinic.',
    sources: [
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'At the start of clinic, you discover a staffing change and several patients with different needs. What is the best first step?',
        answers: ['Start appointments without checking the plan', 'Review the clinic priorities with the team, identify risks and agree responsibilities', 'Ask patients to decide the order themselves', 'Cancel the whole clinic without consulting anyone'],
        correct: 1,
        explanation: 'A team briefing helps identify risks, clarify responsibilities and coordinate care. Reassess priorities as the clinic changes.'
      },
      {
        question: 'A patient in the waiting area says they feel suddenly much worse while another patient asks about a routine delay. What should you do?',
        answers: ['Finish the routine conversation before responding', 'Ask the unwell person to wait for their booked appointment', 'Respond to the unwell person promptly, seek appropriate clinical help and arrange support for the other patient', 'Ask another patient to assess them'],
        correct: 2,
        explanation: 'A change in a patient’s condition needs prompt attention and escalation. In an immediate emergency, activate the local emergency response without delay.'
      },
      {
        question: 'The clinic is delayed and a patient asks when they will be seen. You do not know the exact time. What is the most appropriate response?',
        answers: ['Acknowledge the delay, give a truthful update and explain how you will keep them informed', 'Promise they will be seen in five minutes', 'Avoid answering until the clinic has finished', 'Tell them the delay is their fault'],
        correct: 0,
        explanation: 'Honest, compassionate communication helps patients understand what is happening without making promises you cannot keep.'
      },
      {
        question: 'You need to hand over an outstanding patient concern to a colleague. What makes the handover safer?',
        answers: ['Mention it casually in a public waiting room', 'Only say that the patient was “difficult”', 'Leave without confirming who is taking over', 'Provide a clear, factual update through an approved confidential route and confirm who will act'],
        correct: 3,
        explanation: 'A clear handover communicates relevant concerns, actions and responsibility while protecting confidentiality.'
      },
      {
        question: 'A task has been delegated to you, but you have not been trained to do it. What should you do?',
        answers: ['Carry it out anyway because the clinic is busy', 'Explain your training needs to your supervisor and seek appropriate support before proceeding', 'Assume training is unnecessary for routine tasks', 'Leave the task without telling anyone'],
        correct: 1,
        explanation: 'Be open about your competence and seek appropriate support and supervision. Do not undertake a task you are not prepared to perform safely.'
      }
    ]
  },
  deterioration: {
    title: 'Spotting Deterioration',
    introduction: 'Recognise a change in condition, listen to concerns and practise timely escalation in an outpatient setting.',
    sources: [
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/'],
      ['NHS England: Managing acute physical deterioration', 'https://www.england.nhs.uk/patient-safety/managing-acute-physical-deterioration-through-the-prevention-identification-escalation-response-pier-approach/']
    ],
    questions: [
      {
        question: 'A patient in clinic becomes suddenly very unwell and appears to need immediate emergency help. What is the safest response?',
        answers: ['Leave them alone while you finish your notes', 'Ask them to wait until the appointment ends', 'Activate the local emergency response immediately and stay with the patient, getting colleagues to help', 'Wait for an early warning score before calling for help'],
        correct: 2,
        explanation: 'An immediate emergency needs an immediate local emergency response. Do not delay calling for help to complete a score or routine paperwork.'
      },
      {
        question: 'A patient’s relative says the patient is unusually confused compared with their normal state. What should you do?',
        answers: ['Dismiss the concern because the relative is not a clinician', 'Listen, assess promptly within your competence and escalate using the local pathway', 'Wait until the next routine appointment', 'Assume it is normal for the patient’s age'],
        correct: 1,
        explanation: 'A change from the person’s usual state and concerns from those who know them can be important. Assess and escalate promptly using local procedures.'
      },
      {
        question: 'Your observations have not produced a high early warning score, but you remain worried about the patient. What should guide your next step?',
        answers: ['The score always overrides clinical concern', 'Do nothing until the score increases', 'Ask the patient to leave without review', 'Escalate your concern to your supervisor or appropriate clinician using local policy, even if the score is low'],
        correct: 3,
        explanation: 'An early warning score supports, but does not replace, clinical judgement. Escalate when you are concerned, regardless of the score.'
      },
      {
        question: 'While seeking help for a deteriorating patient, what information is most useful to share?',
        answers: ['The patient’s identity, current concern, relevant observations and changes, and what help is needed', 'Only the patient’s first name', 'An unrelated patient’s results', 'Your opinion without any relevant observations'],
        correct: 0,
        explanation: 'A structured, factual handover helps the receiving clinician understand the concern and respond. Use the handover approach required locally.'
      },
      {
        question: 'You have raised a concern but the patient continues to worsen and help has not arrived. What should you do?',
        answers: ['Assume the original message was enough and leave', 'Wait until the end of clinic', 'Re-escalate urgently using the appropriate local emergency or escalation route and continue within your competence', 'Change the observations to make the concern appear more urgent'],
        correct: 2,
        explanation: 'Continue to monitor and re-escalate if the patient worsens or the response is inadequate. Follow local emergency procedures and work within your competence.'
      }
    ]
  },
  infection: {
    title: 'Infection Prevention',
    introduction: 'Explore hand hygiene, protective equipment and safe preparation between patients.',
    sources: [
      ['NHS England: National infection prevention and control manual', 'https://www.england.nhs.uk/infection-prevention-and-control/nipcm-for-england/'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'You have removed gloves after patient contact and are about to touch a clean surface. What should you do?',
        answers: ['Perform hand hygiene in line with local policy', 'Assume gloves made hand hygiene unnecessary', 'Put on another pair of gloves without cleaning your hands', 'Wipe your hands on a clean apron'],
        correct: 0,
        explanation: 'Gloves do not replace hand hygiene. Follow the national and local hand hygiene guidance at the appropriate moments.'
      },
      {
        question: 'How should you choose personal protective equipment before an outpatient activity?',
        answers: ['Use the same equipment for every situation regardless of risk', 'Use only what happens to be nearest', 'Choose equipment based on the task, risk assessment and current local infection prevention guidance', 'Ask the patient to choose the equipment for you'],
        correct: 2,
        explanation: 'PPE selection depends on the anticipated exposure and applicable precautions. Follow current local and national guidance.'
      },
      {
        question: 'Reusable equipment has been used for one patient and is needed for another. What is the appropriate approach?',
        answers: ['Use it again immediately if it looks clean', 'Ask the next patient to clean it', 'Cover it with paper instead of cleaning it', 'Clean or decontaminate it as required by the equipment instructions and local policy before reuse'],
        correct: 3,
        explanation: 'Equipment must be managed safely between patients using the correct cleaning or decontamination process for the item.'
      },
      {
        question: 'A patient reports symptoms that may indicate an infectious illness on arrival. What should you do?',
        answers: ['Ignore the symptoms because the clinic is busy', 'Follow the local assessment and infection prevention pathway and seek advice from the appropriate team', 'Tell the patient to sit anywhere and do not inform staff', 'Make a diagnosis without an assessment'],
        correct: 1,
        explanation: 'Recognise and communicate the possible infection risk and follow local patient assessment, placement and escalation procedures.'
      },
      {
        question: 'You find a used sharp left in a clinic room. What is the safest principle?',
        answers: ['Pick it up by hand to save time', 'Leave it for the next patient', 'Keep others safe and use the approved local sharps safety procedure; seek help if you are not trained', 'Put it in an ordinary waste bin'],
        correct: 2,
        explanation: 'Prevent exposure and follow the local procedure for safe sharps disposal. Do not handle a sharp in a way that risks injury.'
      }
    ]
  },
  consent: {
    title: 'Consent and Confidentiality',
    introduction: 'Consider informed consent, dignity and safe information sharing in everyday outpatient situations.',
    sources: [
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'A patient says they no longer want a planned procedure after it has been explained. What should you do?',
        answers: ['Continue because the appointment was booked', 'Stop, listen to their concerns and respect their decision; involve the appropriate clinician', 'Ask a relative to overrule them automatically', 'Remove their name from the record'],
        correct: 1,
        explanation: 'A person can accept or refuse care. Discuss their concerns, respect their decision and document and escalate as appropriate.'
      },
      {
        question: 'A colleague asks you to discuss identifiable patient information in a crowded lift. What is the best response?',
        answers: ['Speak more quietly and continue', 'Use the patient’s first name only and continue', 'Arrange a suitable private discussion and share only the information needed for care', 'Send the details to a personal messaging account'],
        correct: 2,
        explanation: 'Protect privacy and use approved channels and appropriate settings for sharing necessary information.'
      },
      {
        question: 'A patient signs a consent form but appears unsure about what the procedure involves. What should happen?',
        answers: ['Pause and arrange for their questions to be answered before proceeding', 'Treat the signature as proof that no further discussion is needed', 'Proceed because the clinic is running late', 'Ask them not to raise further questions'],
        correct: 0,
        explanation: 'Consent is a process, not just a signature. Ensure the person has appropriate information and an opportunity to ask questions.'
      },
      {
        question: 'A family member requests details about a patient’s care. What should you consider first?',
        answers: ['Give all details immediately because they are family', 'Refuse every request without considering the circumstances', 'Ask another patient what they think', 'Check the patient’s wishes and the lawful, appropriate basis for sharing information'],
        correct: 3,
        explanation: 'Consider the person’s wishes, capacity, relevant law and local information-sharing procedures. Seek advice if unsure.'
      },
      {
        question: 'You are concerned that a person may have difficulty making a specific decision. What is the appropriate approach?',
        answers: ['Assume they lack capacity because of their diagnosis', 'Follow the applicable mental capacity law and local procedures, support their decision-making and seek advice', 'Let any member of staff decide without assessment', 'Avoid communicating directly with the person'],
        correct: 1,
        explanation: 'Do not assume incapacity. Support the person to decide and follow the applicable legal framework and local policy for the decision.'
      }
    ]
  },
  communication: {
    title: 'Communication and Inclusion',
    introduction: 'Practise inclusive conversations, accessible information and compassionate support in outpatient clinics.',
    sources: [
      ['NHS England: Accessible Information Standard', 'https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'A patient with hearing loss arrives for an appointment. What is the best starting point?',
        answers: ['Ask what communication support works for them and arrange appropriate adjustments', 'Automatically speak to their companion instead', 'Assume that speaking loudly will always be enough', 'Provide written information without asking what they need'],
        correct: 0,
        explanation: 'Ask about the individual’s communication needs and use the support and adjustments appropriate to them.'
      },
      {
        question: 'A patient needs language interpretation to understand an important discussion. What should you do?',
        answers: ['Skip the discussion to keep the clinic moving', 'Assume any accompanying child should interpret', 'Arrange appropriate interpretation through the local service and consider privacy and urgency', 'Use medical jargon more slowly'],
        correct: 2,
        explanation: 'Arrange suitable interpretation under local policy so the patient can understand and participate. Consider the urgency of the situation.'
      },
      {
        question: 'After explaining a follow-up plan, how can you check whether your explanation was clear?',
        answers: ['Ask only “You understand, don’t you?”', 'Invite the person to explain the plan in their own words and clarify anything that is unclear', 'Assume a nod means everything was understood', 'Give the person no opportunity to ask questions'],
        correct: 1,
        explanation: 'Inviting a person to describe the plan in their own words can help identify what needs explaining differently, without blaming them.'
      },
      {
        question: 'A patient becomes distressed while waiting for an appointment. Which response is most appropriate?',
        answers: ['Tell them to stop worrying', 'Discuss their situation loudly with the whole waiting room', 'Ignore them until they are called', 'Acknowledge their feelings, ask what would help and involve the appropriate colleague if needed'],
        correct: 3,
        explanation: 'Listening and responding compassionately can identify the person’s needs. Seek further support when appropriate.'
      },
      {
        question: 'A person has a recorded information or communication support need. What should the service do?',
        answers: ['Identify, record, flag, share appropriately, meet and review the need under local processes', 'Remove the information after every appointment without review', 'Leave it to the person to explain the need repeatedly with no support', 'Share the details publicly so everyone knows'],
        correct: 0,
        explanation: 'The NHS England Accessible Information Standard describes these steps for needs related to disability, impairment or sensory loss.'
      }
    ]
  },
  medicines: {
    title: 'Medicines Safety',
    introduction: 'Explore medicine-related communication, checks, uncertainty and reporting in an outpatient setting.',
    sources: [
      ['NICE: Medicines optimisation (NG5)', 'https://www.nice.org.uk/guidance/ng5'],
      ['NMC: The Code', 'https://www.nmc.org.uk/standards/code/read-the-code-online/']
    ],
    questions: [
      {
        question: 'A medicine instruction is unclear and you cannot safely verify it. What is the safest action?',
        answers: ['Guess the intended instruction', 'Ask the patient to choose the dose', 'Do not proceed until it has been clarified through the appropriate clinical route', 'Copy a different patient’s prescription'],
        correct: 2,
        explanation: 'Do not guess. Clarify unclear or incomplete instructions using the appropriate clinician and local medicines policy before proceeding.'
      },
      {
        question: 'While preparing to administer a medicine with your supervisor, you notice a potential discrepancy in the patient’s allergy information. What should you do?',
        answers: ['Ignore it if the clinic is busy', 'Pause and clarify the discrepancy with the appropriate clinician and patient, following local policy', 'Assume the allergy is no longer relevant', 'Remove the allergy from the record without checking'],
        correct: 1,
        explanation: 'A possible allergy discrepancy must be checked and resolved through the correct process before administration.'
      },
      {
        question: 'A patient reports taking a medicine that is not on the list available to the clinic. What should happen?',
        answers: ['Tell them to stop it immediately without assessment', 'Ignore it because the list must be complete', 'Add a dose from memory and continue', 'Record and communicate the discrepancy through the appropriate medicines reconciliation process'],
        correct: 3,
        explanation: 'Accurate medicines information may require checking multiple sources and communicating discrepancies to the appropriate professional.'
      },
      {
        question: 'A patient asks a medicines question outside your competence. What is the best response?',
        answers: ['Give a confident guess', 'Tell them questions are not allowed', 'Acknowledge the question and seek advice from an appropriate clinician or pharmacist', 'Search an unverified social media post'],
        correct: 2,
        explanation: 'Work within your competence and seek a reliable answer from an appropriate professional or approved source.'
      },
      {
        question: 'A medicines-related error or near miss is identified. What should you do?',
        answers: ['Put patient safety first, promptly inform the appropriate clinician and follow local reporting and duty of candour processes', 'Hide the information if no harm is obvious', 'Alter the record to remove evidence of the event', 'Wait until the next appraisal to mention it'],
        correct: 0,
        explanation: 'Respond to immediate patient safety needs, escalate, document and report in line with local policy and applicable duty of candour requirements.'
      }
    ]
  }
};
