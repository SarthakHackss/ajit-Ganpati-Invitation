import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

// Configuration
const Eu = {
  theme: 'royalGreen',
  meta: {
    title: 'पाटील गणेश उत्सव',
    description: 'गणरायाच्या आगमनाचे सस्नेह आमंत्रण'
  },
  familyName: 'पाटील',
  heroTitle: 'बाप्पाचे आगमन',
  heroIntroLine: 'आमच्या घरी यावर्षी',
  familyNameInvite: 'पाटील परिवाराकडून',
  familySection: {
    text: 'गणरायाच्या आगमनाच्या या मंगल क्षणी आपण सर्वांनी उपस्थित राहून उत्सवाची शोभा वाढवावी.',
    members: [
      { name: 'अजित पाटील', image: '/assets/family-1.png' },
      { name: 'दत्ताराम पाटील', image: '/assets/family-2.png' },
      { name: 'सुवर्णा पाटील', image: '/assets/family-3.png' },
      { name: 'समीक्षा पाटील', image: '/assets/family-4.png' }
    ]
  },
  utsavSection: {
    tabs: [
      { label: 'स्थापना', value: '१४ सप्टेंबर २०२६' },
      { label: 'आरती वेळ', values: ['सकाळी ८:००', 'सायंकाळी ७:३०'] }
    ],
    note: [
      'यावर्षी आमच्या घरी १४ सप्टेंबर २०२६ रोजी गणरायाची स्थापना होणार असून बाप्पाचा मुक्काम ५ दिवसांचा असणार आहे.',
      'या मंगल प्रसंगी आपण सर्वांनी सहकुटुंब उपस्थित राहून बाप्पाचे आशीर्वाद घ्यावेत, ही नम्र विनंती.'
    ]
  },
  locationSection: {
    address: 'पाटील निवास',
    fullAddress: 'मु. पो, कोर्लई, ता.मुरुड , रायगड, महाराष्ट्र ',
    mapsLink: 'https://maps.app.goo.gl/wo2JxoEUJWfTfmJ66',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241318.121973907!2d72.87835265000001!3d19.081507449999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1783225988676!5m2!1sen!2sin',
    note: 'बाप्पाच्या दर्शनासाठी अवश्य या'
  },
  blessingsSection: {
    blessings: [
      'गणपती बाप्पा आपल्या जीवनात सुख, समृद्धी आणि आनंद घेऊन येवो.',
      'बाप्पाचे आशीर्वाद आपल्या परिवारावर सदैव राहो.',
      'मंगलमूर्ती मोरया! आपल्या सर्व इच्छा पूर्ण होवोत.',
      'गणराय आपल्या घरात आनंद आणि शांतता घेऊन येवो.',
      'आपल्या प्रत्येक कार्यात बाप्पाची कृपा लाभो.',
      'सुख, समाधान आणि भरभराट आपल्या जीवनात नांदो.',
      'गणेशोत्सवाचा हा मंगल उत्सव आपल्या आयुष्यात प्रकाश आणो.',
      'गणपती बाप्पाच्या कृपेने सर्व संकटे दूर होवोत.',
      'आपल्या परिवाराला आरोग्य, आनंद आणि यश लाभो.',
      'बाप्पाचे मंगल आशीर्वाद सदैव आपल्या सोबत राहोत.'
    ]
  },
  finalSection: {
    message: ['आपली उपस्थिती हेच आमच्यासाठी', 'बाप्पाचे आशीर्वाद आहेत.'],
    familySignature: '— पाटील परिवार'
  },
  audio: {
    path: '/assets/bgMusic.mp3',
    volume: 0.35,
    autoplayAfterInteraction: true
  },
  credit: {
    text: 'Crafted by Sarthak Patil (Instagram - Sarthak_1963 & MediaMotive.co ) ',
    link: 'https://instagram.com/mediamotive.co'
  }
};

// Theme Color Palettes
const themePalettes = {
  royalGreen: {
    primaryBg: '#031a0e',
    secondaryBg: '#082917',
    bgDark: '#010a05',
    gold: '#d4a64a',
    goldMuted: '#b88a2f',
    cream: '#f5e9d0',
    creamMuted: '#d8c7a3',
    gradientHero: 'radial-gradient(circle at top, rgba(16, 75, 42, 0.22), transparent 46%), linear-gradient(180deg, #010a05 0%, #031a0e 36%, #082917 68%, #010a05 100%)',
    glow1: 'radial-gradient(circle, rgba(212, 166, 74, 0.12), rgba(212, 166, 74, 0.03) 34%, transparent 72%)',
    glow2: 'radial-gradient(circle, rgba(255, 255, 255, 0.03), transparent 72%)',
    cardBg: 'linear-gradient(180deg, rgba(8, 38, 22, 0.88), rgba(2, 16, 8, 0.96))',
    cardBorder: 'rgba(212, 166, 74, 0.14)',
    cardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.05), transparent 72%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(2, 16, 8, 0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.08), transparent 72%)',
    dotBg: 'rgba(212, 166, 74, 0.18)',
    dotActiveBg: 'rgba(212, 166, 74, 0.72)',
    musicToggleBg: 'rgba(5, 28, 14, 0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #d4a64a, #f3d38a)',
    musicToggleActiveShadow: '0 0 24px rgba(212, 166, 74, 0.28), 0 10px 30px rgba(212, 166, 74, 0.22)',
    utsavTabBg: 'linear-gradient(180deg, rgba(8, 38, 22, 0.45), rgba(2, 16, 8, 0.80))',
    utsavTabBorder: 'rgba(212, 166, 74, 0.12)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(8, 38, 22, 0.38), rgba(2, 16, 8, 0.72))',
    utsavNoteBorder: 'rgba(212, 166, 74, 0.10)',
    mapCardBg: 'linear-gradient(180deg, rgba(8, 38, 22, 0.45), rgba(2, 16, 8, 0.80))',
    mapCardBorder: 'rgba(212, 166, 74, 0.10)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(2, 16, 8, 0.92))',
    blessingCardBg: 'linear-gradient(180deg, rgba(8, 38, 22, 0.45), rgba(2, 16, 8, 0.80))',
    blessingCardBorder: 'rgba(212, 166, 74, 0.10)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.08), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(8, 38, 22, 0.45), rgba(2, 16, 8, 0.80))',
    galleryItemBorder: 'rgba(212, 166, 74, 0.10)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(2, 16, 8, 0.55))',
    finalGlow: 'radial-gradient(circle, rgba(212, 166, 74, 0.05), transparent 74%)'
  },
  royalBlue: {
    primaryBg: '#061229', secondaryBg: '#07153d', bgDark: '#020816', gold: '#d4a64a', goldMuted: '#b88a2f', cream: '#f5e9d0', creamMuted: '#d8c7a3',
    gradientHero: 'radial-gradient(circle at top, rgba(18, 38, 92, 0.18), transparent 46%), linear-gradient(180deg, #01040d 0%, #020816 36%, #04102e 68%, #01040d 100%)',
    glow1: 'radial-gradient(circle, rgba(212, 166, 74, 0.08), rgba(212, 166, 74, 0.03) 34%, transparent 72%)',
    glow2: 'radial-gradient(circle, rgba(255, 255, 255, 0.025), transparent 72%)',
    cardBg: 'linear-gradient(180deg, rgba(7, 17, 51, 0.86), rgba(3, 8, 22, 0.96))',
    cardBorder: 'rgba(212, 166, 74, 0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.035), transparent 72%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(3, 8, 22, 0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.06), transparent 72%)',
    dotBg: 'rgba(212, 166, 74, 0.18)',
    dotActiveBg: 'rgba(212, 166, 74, 0.72)',
    musicToggleBg: 'rgba(6, 16, 48, 0.72)',
    musicToggleActiveBg: 'linear-gradient(135deg, #d4a64a, #f3d38a)',
    musicToggleActiveShadow: '0 0 24px rgba(212, 166, 74, 0.28), 0 10px 30px rgba(212, 166, 74, 0.22)',
    utsavTabBg: 'linear-gradient(180deg, rgba(7, 17, 51, 0.42), rgba(3, 8, 22, 0.78))',
    utsavTabBorder: 'rgba(212, 166, 74, 0.1)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(7, 17, 51, 0.36), rgba(3, 8, 22, 0.7))',
    utsavNoteBorder: 'rgba(212, 166, 74, 0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(7, 17, 51, 0.42), rgba(3, 8, 22, 0.78))',
    mapCardBorder: 'rgba(212, 166, 74, 0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(3, 8, 22, 0.9))',
    blessingCardBg: 'linear-gradient(180deg, rgba(7, 17, 51, 0.42), rgba(3, 8, 22, 0.78))',
    blessingCardBorder: 'rgba(212, 166, 74, 0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.08), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(7, 17, 51, 0.42), rgba(3, 8, 22, 0.78))',
    galleryItemBorder: 'rgba(212, 166, 74, 0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(3, 8, 22, 0.52))',
    finalGlow: 'radial-gradient(circle, rgba(212, 166, 74, 0.035), transparent 76%)'
  },
  emeraldGreen: {
    primaryBg: '#03200d', secondaryBg: '#063316', bgDark: '#010d05', gold: '#d4a64a', goldMuted: '#b88a2f', cream: '#f5e9d0', creamMuted: '#d8c7a3',
    gradientHero: 'radial-gradient(circle at top, rgba(12, 60, 24, 0.18), transparent 46%), linear-gradient(180deg, #010d05 0%, #02170a 36%, #03200d 68%, #010d05 100%)',
    glow1: 'radial-gradient(circle, rgba(212, 166, 74, 0.07), rgba(212, 166, 74, 0.025) 34%, transparent 72%)',
    glow2: 'radial-gradient(circle, rgba(255, 255, 255, 0.02), transparent 74%)',
    cardBg: 'linear-gradient(180deg, rgba(6, 26, 12, 0.86), rgba(2, 13, 5, 0.96))',
    cardBorder: 'rgba(212, 166, 74, 0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.03), transparent 72%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(2, 13, 5, 0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.05), transparent 72%)',
    dotBg: 'rgba(212, 166, 74, 0.18)',
    dotActiveBg: 'rgba(212, 166, 74, 0.72)',
    musicToggleBg: 'rgba(5, 24, 10, 0.72)',
    musicToggleActiveBg: 'linear-gradient(135deg, #d4a64a, #f3d38a)',
    musicToggleActiveShadow: '0 0 24px rgba(212, 166, 74, 0.28), 0 10px 30px rgba(212, 166, 74, 0.22)',
    utsavTabBg: 'linear-gradient(180deg, rgba(6, 26, 12, 0.42), rgba(2, 13, 5, 0.78))',
    utsavTabBorder: 'rgba(212, 166, 74, 0.1)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(6, 26, 12, 0.36), rgba(2, 13, 5, 0.7))',
    utsavNoteBorder: 'rgba(212, 166, 74, 0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(6, 26, 12, 0.42), rgba(2, 13, 5, 0.78))',
    mapCardBorder: 'rgba(212, 166, 74, 0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(2, 13, 5, 0.9))',
    blessingCardBg: 'linear-gradient(180deg, rgba(6, 26, 12, 0.42), rgba(2, 13, 5, 0.78))',
    blessingCardBorder: 'rgba(212, 166, 74, 0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.08), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(6, 26, 12, 0.42), rgba(2, 13, 5, 0.78))',
    galleryItemBorder: 'rgba(212, 166, 74, 0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(2, 13, 5, 0.52))',
    finalGlow: 'radial-gradient(circle, rgba(212, 166, 74, 0.03), transparent 76%)'
  },
  maroonRoyal: {
    primaryBg: '#220607', secondaryBg: '#32090c', bgDark: '#120203', gold: '#c9973f', goldMuted: '#b88a2f', cream: '#f5e9d0', creamMuted: '#d8c7a3',
    gradientHero: 'radial-gradient(circle at top, rgba(120, 18, 32, 0.20), transparent 42%), linear-gradient(180deg, #120203 0%, #220607 34%, #32090c 68%, #120203 100%)',
    glow1: 'radial-gradient(circle, rgba(212, 166, 74, 0.16), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(38, 12, 12, 0.86), rgba(12, 3, 3, 0.96))',
    cardBorder: 'rgba(212, 166, 74, 0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(212, 166, 74, 0.08), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(12,3,3,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(212,166,74,0.14), transparent 68%)',
    dotBg: 'rgba(212,166,74,0.18)',
    dotActiveBg: 'rgba(212,166,74,0.72)',
    musicToggleBg: 'rgba(26, 8, 8, 0.72)',
    musicToggleActiveBg: 'linear-gradient(135deg, #d4a64a, #f3d38a)',
    musicToggleActiveShadow: '0 0 24px rgba(212,166,74,0.22), 0 10px 30px rgba(212,166,74,0.18)',
    utsavTabBg: 'linear-gradient(180deg, rgba(38,12,12,0.42), rgba(12,3,3,0.78))',
    utsavTabBorder: 'rgba(212,166,74,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(38,12,12,0.36), rgba(12,3,3,0.70))',
    utsavNoteBorder: 'rgba(212,166,74,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(38,12,12,0.42), rgba(12,3,3,0.78))',
    mapCardBorder: 'rgba(212,166,74,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(12,3,3,0.9))',
    blessingCardBg: 'linear-gradient(180deg, rgba(38,12,12,0.42), rgba(12,3,3,0.78))',
    blessingCardBorder: 'rgba(212,166,74,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(212,166,74,0.08), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(38,12,12,0.42), rgba(12,3,3,0.78))',
    galleryItemBorder: 'rgba(212,166,74,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(12,3,3,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(212, 166, 74, 0.08), transparent 72%)'
  },
  saffronAmber: {
    primaryBg: '#221006', secondaryBg: '#381909', bgDark: '#120703', gold: '#d0a04a', goldMuted: '#b37d2a', cream: '#f5e6c8', creamMuted: '#d8bf96',
    gradientHero: 'radial-gradient(circle at top, rgba(176, 92, 18, 0.18), transparent 42%), linear-gradient(180deg, #120703 0%, #221006 34%, #381909 68%, #120703 100%)',
    glow1: 'radial-gradient(circle, rgba(208,160,74,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(42,20,10,0.86), rgba(18,7,3,0.96))',
    cardBorder: 'rgba(208,160,74,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(208,160,74,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(18,7,3,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(208,160,74,0.12), transparent 68%)',
    dotBg: 'rgba(208,160,74,0.16)',
    dotActiveBg: 'rgba(208,160,74,0.62)',
    musicToggleBg: 'rgba(34,16,6,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #d0a04a, #efc97d)',
    musicToggleActiveShadow: '0 0 24px rgba(208,160,74,0.18), 0 10px 30px rgba(208,160,74,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(42,20,10,0.42), rgba(18,7,3,0.78))',
    utsavTabBorder: 'rgba(208,160,74,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(42,20,10,0.36), rgba(18,7,3,0.70))',
    utsavNoteBorder: 'rgba(208,160,74,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(42,20,10,0.42), rgba(18,7,3,0.78))',
    mapCardBorder: 'rgba(208,160,74,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(18,7,3,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(42,20,10,0.42), rgba(18,7,3,0.78))',
    blessingCardBorder: 'rgba(208,160,74,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(208,160,74,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(42,20,10,0.42), rgba(18,7,3,0.78))',
    galleryItemBorder: 'rgba(208,160,74,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(18,7,3,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(208,160,74,0.06), transparent 72%)'
  },
  deepPlum: {
    primaryBg: '#160811', secondaryBg: '#241022', bgDark: '#090307', gold: '#c79a42', goldMuted: '#a9782a', cream: '#f3e7d0', creamMuted: '#d6c2a1',
    gradientHero: 'radial-gradient(circle at top, rgba(98, 32, 74, 0.22), transparent 42%), linear-gradient(180deg, #090307 0%, #160811 34%, #241022 68%, #090307 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(30,14,28,0.86), rgba(9,3,7,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(9,3,7,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(22,8,17,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(30,14,28,0.42), rgba(9,3,7,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(30,14,28,0.36), rgba(9,3,7,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(30,14,28,0.42), rgba(9,3,7,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(9,3,7,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(30,14,28,0.42), rgba(9,3,7,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(30,14,28,0.42), rgba(9,3,7,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(9,3,7,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  royalRoseVelvet: {
    primaryBg: '#1C0A13', secondaryBg: '#28101C', bgDark: '#050203', gold: '#c79a42', goldMuted: '#a9782a', cream: '#f3e7d0', creamMuted: '#d6c2a1',
    gradientHero: 'radial-gradient(circle at top, rgba(194,92,145,0.05), transparent 42%), linear-gradient(180deg, #050203 0%, #1C0A13 34%, #28101C 68%, #050203 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(122,29,90,0.86), rgba(42,10,31,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(42,10,31,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(42,10,31,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(122,29,90,0.42), rgba(42,10,31,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(122,29,90,0.36), rgba(42,10,31,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(122,29,90,0.42), rgba(42,10,31,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(42,10,31,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(122,29,90,0.42), rgba(42,10,31,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(122,29,90,0.42), rgba(42,10,31,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(42,10,31,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  peacockRoyal: {
    primaryBg: '#07171B', secondaryBg: '#0D2329', bgDark: '#020608', gold: '#c79a42', goldMuted: '#a9782a', cream: '#f3e7d0', creamMuted: '#d6c2a1',
    gradientHero: 'radial-gradient(circle at top, rgba(24,120,128,0.08), transparent 42%), linear-gradient(180deg, #020608 0%, #07171B 34%, #0D2329 68%, #020608 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(7,23,27,0.86), rgba(2,6,8,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(2,6,8,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(7,23,27,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(7,23,27,0.42), rgba(2,6,8,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(7,23,27,0.36), rgba(2,6,8,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(7,23,27,0.42), rgba(2,6,8,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(2,6,8,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(7,23,27,0.42), rgba(2,6,8,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(7,23,27,0.42), rgba(2,6,8,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(2,6,8,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  antiqueCopper: {
    primaryBg: '#1B120D', secondaryBg: '#2D1D15', bgDark: '#080503', gold: '#C79A42', goldMuted: '#A9782A', cream: '#F3E7D0', creamMuted: '#D6C2A1',
    gradientHero: 'radial-gradient(circle at top, rgba(180,108,55,0.08), transparent 42%), linear-gradient(180deg, #080503 0%, #1B120D 34%, #2D1D15 68%, #080503 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(27,18,13,0.86), rgba(8,5,3,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(8,5,3,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(27,18,13,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(27,18,13,0.42), rgba(8,5,3,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(27,18,13,0.36), rgba(8,5,3,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(27,18,13,0.42), rgba(8,5,3,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(8,5,3,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(27,18,13,0.42), rgba(8,5,3,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(27,18,13,0.42), rgba(8,5,3,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(8,5,3,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  midnightIndigo: {
    primaryBg: '#0D1220', secondaryBg: '#171D32', bgDark: '#04060B', gold: '#C79A42', goldMuted: '#A9782A', cream: '#F3E7D0', creamMuted: '#D6C2A1',
    gradientHero: 'radial-gradient(circle at top, rgba(72,96,180,0.08), transparent 42%), linear-gradient(180deg, #04060B 0%, #0D1220 34%, #171D32 68%, #04060B 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(13,18,32,0.86), rgba(4,6,11,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(4,6,11,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(13,18,32,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(13,18,32,0.42), rgba(4,6,11,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(13,18,32,0.36), rgba(4,6,11,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(13,18,32,0.42), rgba(4,6,11,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(4,6,11,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(13,18,32,0.42), rgba(4,6,11,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(13,18,32,0.42), rgba(4,6,11,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(4,6,11,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  royalAubergine: {
    primaryBg: '#181119', secondaryBg: '#241A26', bgDark: '#060506', gold: '#C79A42', goldMuted: '#A9782A', cream: '#F3E7D0', creamMuted: '#D6C2A1',
    gradientHero: 'radial-gradient(circle at top, rgba(98,72,112,0.06), transparent 42%), linear-gradient(180deg, #060506 0%, #181119 34%, #241A26 68%, #060506 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255, 255, 255, 0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(24,17,25,0.86), rgba(6,5,6,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(6,5,6,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(24,17,25,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(24,17,25,0.42), rgba(6,5,6,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(24,17,25,0.36), rgba(6,5,6,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(24,17,25,0.42), rgba(6,5,6,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(6,5,6,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(24,17,25,0.42), rgba(6,5,6,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(24,17,25,0.42), rgba(6,5,6,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(6,5,6,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  deepRubyGold: {
    primaryBg: '#170608', secondaryBg: '#261014', bgDark: '#050102', gold: '#C79A42', goldMuted: '#A9782A', cream: '#F3E7D0', creamMuted: '#D6C2A1',
    gradientHero: 'radial-gradient(circle at top, rgba(156,28,46,0.08), transparent 42%), linear-gradient(180deg, #050102 0%, #170608 34%, #261014 68%, #050102 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(23,6,8,0.86), rgba(5,1,2,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(5,1,2,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(23,6,8,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(23,6,8,0.42), rgba(5,1,2,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(23,6,8,0.36), rgba(5,1,2,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(23,6,8,0.42), rgba(5,1,2,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(5,1,2,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(23,6,8,0.42), rgba(5,1,2,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(23,6,8,0.42), rgba(5,1,2,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(5,1,2,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  },
  royalForestGold: {
    primaryBg: '#0C1610', secondaryBg: '#16231A', bgDark: '#030603', gold: '#C79A42', goldMuted: '#A9782A', cream: '#F3E7D0', creamMuted: '#D6C2A1',
    gradientHero: 'radial-gradient(circle at top, rgba(46,122,76,0.08), transparent 42%), linear-gradient(180deg, #030603 0%, #0C1610 34%, #16231A 68%, #030603 100%)',
    glow1: 'radial-gradient(circle, rgba(199,154,66,0.14), transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 68%)',
    cardBg: 'linear-gradient(180deg, rgba(12,22,16,0.86), rgba(3,6,3,0.96))',
    cardBorder: 'rgba(199,154,66,0.12)',
    cardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 65%)',
    cardImageBg: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(3,6,3,0.96))',
    cardImageGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.12), transparent 68%)',
    dotBg: 'rgba(199,154,66,0.16)',
    dotActiveBg: 'rgba(199,154,66,0.62)',
    musicToggleBg: 'rgba(12,22,16,0.74)',
    musicToggleActiveBg: 'linear-gradient(135deg, #c79a42, #e4c27d)',
    musicToggleActiveShadow: '0 0 24px rgba(199,154,66,0.18), 0 10px 30px rgba(199,154,66,0.14)',
    utsavTabBg: 'linear-gradient(180deg, rgba(12,22,16,0.42), rgba(3,6,3,0.78))',
    utsavTabBorder: 'rgba(199,154,66,0.10)',
    utsavNoteBg: 'linear-gradient(180deg, rgba(12,22,16,0.36), rgba(3,6,3,0.70))',
    utsavNoteBorder: 'rgba(199,154,66,0.08)',
    mapCardBg: 'linear-gradient(180deg, rgba(12,22,16,0.42), rgba(3,6,3,0.78))',
    mapCardBorder: 'rgba(199,154,66,0.08)',
    mapOverlay: 'linear-gradient(180deg, transparent 40%, rgba(3,6,3,0.90))',
    blessingCardBg: 'linear-gradient(180deg, rgba(12,22,16,0.42), rgba(3,6,3,0.78))',
    blessingCardBorder: 'rgba(199,154,66,0.08)',
    blessingCardGlow: 'radial-gradient(circle at top, rgba(199,154,66,0.06), transparent 70%)',
    galleryItemBg: 'linear-gradient(180deg, rgba(12,22,16,0.42), rgba(3,6,3,0.78))',
    galleryItemBorder: 'rgba(199,154,66,0.08)',
    galleryOverlay: 'linear-gradient(180deg, transparent 20%, rgba(3,6,3,0.52))',
    finalGlow: 'radial-gradient(circle, rgba(199,154,66,0.06), transparent 72%)'
  }
};

// Curtain Theme Color Maps
const curtainThemes = {
  royalGreen: { bg: '#041d10', bgDeep: '#010a05', atmosphere: 'rgba(16, 75, 42, 0.28)', panelShade: 'rgba(2, 16, 8, 0.58)' },
  royalBlue: { bg: '#030d20', bgDeep: '#010610', atmosphere: 'rgba(18, 38, 92, 0.26)', panelShade: 'rgba(3, 8, 22, 0.56)' },
  emeraldGreen: { bg: '#03200d', bgDeep: '#010d05', atmosphere: 'rgba(12, 60, 24, 0.26)', panelShade: 'rgba(2, 13, 5, 0.58)' },
  maroonRoyal: { bg: '#220607', bgDeep: '#120203', atmosphere: 'rgba(120, 18, 32, 0.18)', panelShade: 'rgba(18, 2, 3, 0.58)' },
  saffronAmber: { bg: '#221006', bgDeep: '#120703', atmosphere: 'rgba(176, 92, 18, 0.14)', panelShade: 'rgba(18, 7, 3, 0.58)' },
  deepPlum: { bg: '#160811', bgDeep: '#090307', atmosphere: 'rgba(98, 32, 74, 0.18)', panelShade: 'rgba(9, 3, 7, 0.58)' },
  royalRoseVelvet: { bg: '#2A0A1F', bgDeep: '#14050E', atmosphere: 'rgba(255, 105, 180, 0.10)', panelShade: 'rgba(20, 5, 14, 0.60)' },
  peacockRoyal: { bg: '#0E2026', bgDeep: '#07161B', atmosphere: 'rgba(42, 145, 155, 0.14)', panelShade: 'rgba(7, 22, 27, 0.50)' },
  antiqueCopper: { bg: '#2D1D15', bgDeep: '#16100B', atmosphere: 'rgba(180, 108, 55, 0.12)', panelShade: 'rgba(22, 16, 11, 0.50)' },
  midnightIndigo: { bg: '#171D32', bgDeep: '#0A0F1B', atmosphere: 'rgba(72, 96, 180, 0.10)', panelShade: 'rgba(10, 15, 27, 0.50)' },
  royalAubergine: { bg: '#241A26', bgDeep: '#100C11', atmosphere: 'rgba(98, 72, 112, 0.08)', panelShade: 'rgba(16, 12, 17, 0.50)' },
  deepRubyGold: { bg: '#261014', bgDeep: '#100608', atmosphere: 'rgba(156, 28, 46, 0.10)', panelShade: 'rgba(16, 6, 8, 0.50)' },
  royalForestGold: { bg: '#16231A', bgDeep: '#09110C', atmosphere: 'rgba(46, 122, 76, 0.10)', panelShade: 'rgba(9, 17, 12, 0.50)' },
};

// Reusable Components
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

function FadeIn({ children, className = '', delay = 0, style = {}, tag = 'div' }) {
  const MotionTag = motion[tag] || motion.div;
  return (
    <MotionTag
      variants={{
        ...fadeUpVariants,
        visible: {
          ...fadeUpVariants.visible,
          transition: {
            ...fadeUpVariants.visible.transition,
            delay: delay
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em">
      <path
        fillRule="evenodd"
        d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.45, delayChildren: 0.2 }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }
  }
};

function Hero({ isMusicPlaying = false, onToggleMusic, introStarted = true }) {
  return (
    <section className="hero">
      <div className="hero-backdrop" />
      <div className="hero-noise" />
      <div className="hero-glow glow-1" />
      <div className="hero-glow glow-2" />

      <motion.div
        className="hero-inner"
        variants={heroContainerVariants}
        initial="hidden"
        animate={introStarted ? "visible" : "hidden"}
      >
        <motion.div className="hero-top-controls" variants={heroItemVariants}>
          <div className="hero-logo">
            <img src="/assets/logo.webp" alt="Ganesh-Logo" />
            <p className="sacred-line">॥ श्री गणेशाय नमः ॥</p>
          </div>
          <div className="hero-actions">
            <button
              className={`circle-btn music-toggle ${isMusicPlaying ? 'active' : ''}`}
              onClick={onToggleMusic}
              aria-label="Toggle music"
              aria-pressed={isMusicPlaying}
              title="Toggle music"
            >
              <MusicIcon />
            </button>
          </div>
        </motion.div>

        <motion.div className="hero-copy" variants={heroItemVariants}>
          <p className="intro-line">{Eu.heroIntroLine}</p>
          <h1 className="hero-title">
            <span>बाप्पाचे</span>
            <span>आगमन</span>
          </h1>
        </motion.div>

        <motion.div className="visual-wrap" variants={heroItemVariants}>
          <img src="/assets/hero-visual.webp" alt="Ganpati Bappa" className="murti" />
        </motion.div>

        <motion.div className="invite-signature" variants={heroItemVariants}>
          <img src="/assets/divider.webp" alt="" className="invite-divider" />
          <p className="family-name">{Eu.familyNameInvite}</p>
          <p className="invite-subtext">सस्नेह आमंत्रण</p>
          <img src="/assets/divider.webp" alt="" className="invite-divider" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FamilySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef(null);
  const members = Eu.familySection.members;

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + members.length) % members.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % members.length);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll('.family-card-wrapper');
    if (cards[activeIndex]) {
      const card = cards[activeIndex];
      viewport.scrollTo({
        left: card.offsetLeft - viewport.clientWidth / 2 + card.clientWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, members.length]);

  return (
    <section className="section family-section">
      <FadeIn className="family-header">
        <p className="family-tag">INVITATION</p>
        <h2 className="family-heading">सस्नेह आमंत्रण</h2>
        <img src="/assets/divider.webp" alt="" className="family-divider" />
        <p className="family-text">{Eu.familySection.text}</p>
        <img src="/assets/divider.webp" alt="" className="family-divider" />
      </FadeIn>

      <FadeIn className="family-showcase" delay={0.2}>
        <button className="family-arrow family-arrow-left" onClick={handlePrev}>←</button>
        <div className="family-card-viewport" ref={viewportRef}>
          <div className="family-card-track">
            {members.map((member, index) => (
              <div className="family-card-wrapper" key={member.name}>
                <article className="family-card">
                  <div className="family-image-frame">
                    <div className="family-image-glow" />
                    <img src={member.image} alt={member.name} className="family-image" />
                  </div>
                  <div className="family-card-content">
                    <h3>{member.name}</h3>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <button className="family-arrow family-arrow-right" onClick={handleNext}>→</button>
      </FadeIn>

      <FadeIn className="family-dots" delay={0.4}>
        {members.map((_, index) => (
          <span
            key={index}
            className={index === activeIndex ? 'active-dot' : ''}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </FadeIn>
    </section>
  );
}

function UtsavSection() {
  const { utsavSection } = Eu;
  return (
    <section className="section utsav-section">
      <img src="/assets/top-deco.webp" alt="" className="utsav-deco utsav-deco-top" />
      <img src="/assets/top-deco.webp" alt="" className="utsav-deco utsav-deco-bottom" />

      <FadeIn className="utsav-content">
        <p className="utsav-tag">FESTIVAL</p>
        <h2 className="utsav-heading">गणेश उत्सव</h2>
        <img src="/assets/divider.webp" alt="" className="utsav-divider" />

        <FadeIn className="utsav-tabs" delay={0.2}>
          {utsavSection.tabs.map((tab, idx) => (
            <div className="utsav-tab" key={idx}>
              <span>{tab.label}</span>
              {tab.value ? (
                <h3>{tab.value}</h3>
              ) : (
                <>
                  {tab.values?.map((val, vidx) => (
                    <h3 key={vidx}>{val}</h3>
                  ))}
                </>
              )}
            </div>
          ))}
        </FadeIn>

        <FadeIn className="utsav-note" delay={0.4}>
          {utsavSection.note.map((noteText, idx) => (
            <span key={idx}>
              {idx > 0 && (
                <>
                  <br />
                  <br />
                </>
              )}
              {noteText}
            </span>
          ))}
        </FadeIn>
      </FadeIn>
    </section>
  );
}

function LocationSection() {
  const { locationSection } = Eu;
  return (
    <section className="section location-section">
      <FadeIn className="location-content">
        <p className="location-tag">LOCATION</p>
        <h2 className="location-heading">ठिकाण</h2>
        <img src="/assets/divider.webp" alt="" className="location-divider" />

        <FadeIn className="map-card" delay={0.2}>
          <div className="map-preview">
            <iframe
              src={locationSection.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-overlay" />
          </div>
          <div className="map-info">
            <div className="map-address">
              <h3>{locationSection.address}</h3>
              <p>{locationSection.fullAddress}</p>
            </div>
            <a
              href={locationSection.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="map-button"
            >
              Open Maps
            </a>
          </div>
          <div className="map-note">{locationSection.note}</div>
        </FadeIn>
      </FadeIn>
    </section>
  );
}

function FinalSection() {
  const { finalSection, credit } = Eu;
  return (
    <section className="section final-section">
      <img src="/assets/top-deco.webp" alt="" className="final-deco final-deco-top" />

      <FadeIn className="final-content">
        <img src="/assets/divider.webp" alt="" className="final-divider" />
        <p className="final-message">
          {finalSection.message.map((msg, idx) => (
            <span key={idx}>
              {idx > 0 && <br />}
              {msg}
            </span>
          ))}
        </p>
        <p className="final-family">{finalSection.familySignature}</p>
        <div className="final-glow" />
      </FadeIn>

      <a href={credit.link} target="_blank" rel="noopener noreferrer" className="crafted-by">
        {credit.text}
      </a>
    </section>
  );
}

function CurtainIntro({ onOpen, onStartAudio, onComplete, themeName = 'royalGreen' }) {
  const [status, setStatus] = useState('closed'); // 'closed', 'opening', 'exiting'
  const statusRef = useRef('closed');
  const timeouts = useRef([]);
  const originalOverflow = useRef('');
  const isScrollUnlocked = useRef(false);

  const theme = useMemo(() => curtainThemes[themeName] || curtainThemes.royalGreen || curtainThemes.royalBlue, [themeName]);

  const isOpen = status !== 'closed';
  const isExiting = status === 'exiting';

  const openDuration = 4800; // ms
  const fadeDuration = 220; // ms

  const styleVariables = {
    '--curtain-intro-bg': theme.bg,
    '--curtain-intro-bg-deep': theme.bgDeep,
    '--curtain-intro-atmosphere': theme.atmosphere,
    '--curtain-intro-panel-shade': theme.panelShade,
    '--curtain-open-duration': `${openDuration}ms`,
    '--curtain-overlay-fade-duration': `${fadeDuration}ms`,
  };

  const clearTimeouts = useCallback(() => {
    timeouts.current.forEach(window.clearTimeout);
    timeouts.current = [];
  }, []);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const unlockScroll = useCallback(() => {
    if (!isScrollUnlocked.current) {
      document.body.style.overflow = originalOverflow.current;
      isScrollUnlocked.current = true;
    }
  }, []);

  useEffect(() => {
    originalOverflow.current = document.body.style.overflow;
    isScrollUnlocked.current = false;
    document.body.style.overflow = 'hidden';

    return () => {
      unlockScroll();
      clearTimeouts();
    };
  }, [clearTimeouts, unlockScroll]);

  const handleTransitionEnd = useCallback(() => {
    if (statusRef.current === 'opening') {
      unlockScroll();
      clearTimeouts();
      statusRef.current = 'exiting';
      setStatus('exiting');
      timeouts.current = [
        window.setTimeout(() => {
          onComplete?.();
        }, fadeDuration)
      ];
    }
  }, [clearTimeouts, onComplete, fadeDuration, unlockScroll]);

  const handleOpen = () => {
    if (isOpen) return;
    clearTimeouts();
    statusRef.current = 'opening';
    setStatus('opening');
    document.body.style.overflow = '';
    onOpen?.();

    Promise.resolve(onStartAudio?.()).catch(() => { });

    timeouts.current = [
      window.setTimeout(handleTransitionEnd, openDuration + 100)
    ];
  };

  return (
    <div
      className={`curtain-intro ${isOpen ? 'curtain-intro--opening' : ''} ${isExiting ? 'curtain-intro--exiting' : ''}`}
      style={styleVariables}
      aria-label="Invitation opening"
    >
      <div
        className="curtain-intro__gate curtain-intro__gate--left"
        onTransitionEnd={(e) => {
          if (e.propertyName === 'transform' && e.currentTarget === e.target) {
            handleTransitionEnd();
          }
        }}
      >
        <div className="gate-panel">
          <div className="panel-top-line" />
          <div className="panel-frame" />
          <div className="gate-pillar" />
          <div className="gate-center-detail" />
        </div>
      </div>

      <div className="curtain-intro__gate curtain-intro__gate--right">
        <div className="gate-panel">
          <div className="gate-pillar" />
          <div className="gate-center-detail" />
        </div>
      </div>

      <div className="curtain-intro__seam" />

      <button
        type="button"
        className="curtain-intro__button"
        onClick={handleOpen}
        aria-label="Open invitation"
        disabled={isOpen}
      >
        <div className="curtain-intro__button-content">
          <span className="curtain-intro__button-text">॥ गणेशाय नमः ॥</span>
          <span className="curtain-intro__button-subtitle">TAP TO OPEN</span>
        </div>
        <span className="curtain-intro__button-shine" aria-hidden="true" />
      </button>
    </div>
  );
}

// Audio volume fader helper
function animateVolume(audio, targetVolume, duration = 2200) {
  let startTime = performance.now();
  let animationId = 0;

  const step = (now) => {
    const elapsed = Math.max(0, Math.min((now - startTime) / duration, 1));
    // Ease out cubic
    const progress = 1 - Math.pow(1 - elapsed, 3);
    audio.volume = Math.max(0, Math.min(targetVolume * progress, 1));

    if (elapsed < 1) {
      animationId = window.requestAnimationFrame(step);
    }
  };

  animationId = window.requestAnimationFrame(step);
  return () => window.cancelAnimationFrame(animationId);
}

export default function App() {
  const [introState, setIntroState] = useState('closed'); // 'closed', 'opening', 'complete'
  const [introStarted, setIntroStarted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef(null);
  const audioFadeRef = useRef(null);
  const timeoutRef = useRef(null);

  const volume = useMemo(() => {
    const vol = Eu.audio.volume;
    return Math.min(Math.max(vol ?? 0.35, 0), 1);
  }, []);

  useEffect(() => {
    document.body.setAttribute('translate', 'no');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themePalettes[Eu.theme] || themePalettes.royalGreen || themePalettes.royalBlue;

    root.style.setProperty('--color-bg-primary', themeColors.primaryBg);
    root.style.setProperty('--color-bg-secondary', themeColors.secondaryBg);
    root.style.setProperty('--color-bg-dark', themeColors.bgDark);
    root.style.setProperty('--color-gold-primary', themeColors.gold);
    root.style.setProperty('--color-gold-muted', themeColors.goldMuted);
    root.style.setProperty('--color-text-primary', themeColors.cream);
    root.style.setProperty('--color-text-secondary', themeColors.creamMuted);
    root.style.setProperty('--gradient-hero', themeColors.gradientHero);
    root.style.setProperty('--glow-1', themeColors.glow1);
    root.style.setProperty('--glow-2', themeColors.glow2);
    root.style.setProperty('--card-bg', themeColors.cardBg);
    root.style.setProperty('--card-border', themeColors.cardBorder);
    root.style.setProperty('--card-glow', themeColors.cardGlow);
    root.style.setProperty('--card-image-bg', themeColors.cardImageBg);
    root.style.setProperty('--card-image-glow', themeColors.cardImageGlow);
    root.style.setProperty('--dot-bg', themeColors.dotBg);
    root.style.setProperty('--dot-active-bg', themeColors.dotActiveBg);
    root.style.setProperty('--music-toggle-bg', themeColors.musicToggleBg);
    root.style.setProperty('--music-toggle-active-bg', themeColors.musicToggleActiveBg);
    root.style.setProperty('--music-toggle-active-shadow', themeColors.musicToggleActiveShadow);
    root.style.setProperty('--utsav-tab-bg', themeColors.utsavTabBg);
    root.style.setProperty('--utsav-tab-border', themeColors.utsavTabBorder);
    root.style.setProperty('--utsav-note-bg', themeColors.utsavNoteBg);
    root.style.setProperty('--utsav-note-border', themeColors.utsavNoteBorder);
    root.style.setProperty('--map-card-bg', themeColors.mapCardBg);
    root.style.setProperty('--map-card-border', themeColors.mapCardBorder);
    root.style.setProperty('--map-overlay', themeColors.mapOverlay);
    root.style.setProperty('--blessing-card-bg', themeColors.blessingCardBg);
    root.style.setProperty('--blessing-card-border', themeColors.blessingCardBorder);
    root.style.setProperty('--blessing-card-glow', themeColors.blessingCardGlow);
    root.style.setProperty('--gallery-item-bg', themeColors.galleryItemBg);
    root.style.setProperty('--gallery-item-border', themeColors.galleryItemBorder);
    root.style.setProperty('--gallery-overlay', themeColors.galleryOverlay);
    root.style.setProperty('--final-glow', themeColors.finalGlow);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const handleAudioEvent = () => {
      setIsMusicPlaying(!audio.paused);
    };

    audio.addEventListener('play', handleAudioEvent);
    audio.addEventListener('pause', handleAudioEvent);
    audio.addEventListener('ended', handleAudioEvent);

    return () => {
      audioFadeRef.current?.();
      audio.removeEventListener('play', handleAudioEvent);
      audio.removeEventListener('pause', handleAudioEvent);
      audio.removeEventListener('ended', handleAudioEvent);
    };
  }, [volume]);

  const playAudio = useCallback(async ({ fadeIn = false, restart = false } = {}) => {
    const audio = audioRef.current;
    if (!audio) return false;
    audioFadeRef.current?.();
    if (restart) audio.currentTime = 0;
    if (fadeIn) audio.volume = 0;

    try {
      await audio.play();
      setIsMusicPlaying(true);
      if (fadeIn) {
        audioFadeRef.current = animateVolume(audio, volume);
      } else {
        audio.volume = volume;
      }
      return true;
    } catch (err) {
      if (audio.paused) setIsMusicPlaying(false);
      return false;
    }
  }, [volume]);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audioFadeRef.current?.();
      audio.pause();
      setIsMusicPlaying(false);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [playAudio, pauseAudio]);

  const handleOpenCurtain = useCallback(() => {
    setIntroState('opening');
    timeoutRef.current = window.setTimeout(() => {
      setIntroStarted(true);
    }, 800);
  }, []);

  const handleCompleteCurtain = useCallback(() => {
    setIntroState('complete');
    setIntroStarted(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
      <audio
        id="bgMusic"
        ref={audioRef}
        src={Eu.audio.path}
        loop
        preload="auto"
      />
      <div className="site-shell" data-intro-state={introState}>
        <Hero
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={toggleMusic}
          introStarted={introStarted}
        />
        <FamilySection />
        <UtsavSection />
        <LocationSection />
        <FinalSection />
      </div>
      {introState !== 'complete' && (
        <CurtainIntro
          themeName={Eu.theme}
          onOpen={handleOpenCurtain}
          onStartAudio={() => playAudio({ fadeIn: false, restart: true })}
          onComplete={handleCompleteCurtain}
        />
      )}
    </>
  );
}
