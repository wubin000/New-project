import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';
import Grainient from './Grainient';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

function LazyVideo({ src, className, poster, children, rootMargin = '600px', ...props }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setShouldLoad((loaded) => loaded || visible);
        if (visible) {
          node.play?.().catch(() => {});
        } else {
          node.pause?.();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !shouldLoad) return;
    node.load();
    node.play?.().catch(() => {});
  }, [shouldLoad, src]);

  return (
    <video ref={videoRef} className={className} poster={poster} preload="none" {...props}>
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
      {children}
    </video>
  );
}

const profile = {
  name: '吴斌',
  title: 'Visual / 3D / AI Designer',
  phone: '18084807133',
  email: 'wubinskt@gmail.com',
  location: '成都市机头桥',
  intro:
    '拥有 3 年 3D 产品商业项目经验，能够独立完成从创意方案到 3D 资产、动态 Layout、美术帧、灯光材质渲染、NUKE 合成与视频 Demo 的制作。具备 AIGC 商业视频广告经验，审美稳定，学习和适应能力强。',
};

const stats = [
  { value: '3+', label: '3年3D项目工作经验' },
  { value: '12+', label: '一线品牌项目' },
  { value: 'AI+3D', label: '商业工作流程经验' },
  { value: 'AIGC', label: '一线项目经验' },
];

const experiences = [
  {
    period: '2023 - Now',
    company: '成都盯潮科技有限公司（低聚体团队）',
    role: '3D 设计师',
    detail:
      '根据创意方案制作 3D 资产、动态 Layout、美术帧、后期合成与视频 Demo，并参与 AIGC 商业视频广告制作。',
  },
  {
    period: '2019 - 2023',
    company: '成都筑梦空间文化传媒有限公司',
    role: '后期剪辑包装',
    detail:
      '负责宣传片、TVC 等拍摄素材的剪辑、调色、包装，并根据脚本制作 AE 特效。',
  },
];

const projects = [
  {
    title: 'HOKA MAFATE',
    tag: 'Terrain / Vegetation / Render',
    image: '/assets/project-hoka.svg',
    video: '/assets/hoka-mafate-vertical-full.mp4',
    preview: '/assets/hoka-mafate-vertical-preview.mp4',
    layout: 'portrait',
    description: '负责留尼汪岛地形、植被创建、灯光材质渲染以及合成。',
  },
  {
    title: '倩碧 光子镭射盾',
    tag: 'Scene / Lighting / NUKE',
    image: '/assets/project-clinique.svg',
    video: '/assets/clinique-lsd-vertical-full.mp4',
    preview: '/assets/clinique-lsd-vertical-preview.mp4',
    layout: 'portrait',
    description: '负责 sc001 和 sc003 镜头制作，包括场景搭建、灯光渲染与 NUKE 合成。',
  },
  {
    title: '北面 街头有噱头',
    tag: 'Simulation / Material / Render',
    image: '/assets/project-tnf.svg',
    video: '/assets/tnf-snow-vertical.mp4',
    preview: '/assets/tnf-snow-vertical-preview.mp4',
    layout: 'portrait',
    description: '负责雪特效模拟解算，以及灯光材质渲染。',
  },
  {
    title: 'OPPO COLOROS 16',
    tag: 'AI + 3D Campaigns',
    image: '/assets/project-aigc.svg',
    video: '/assets/color-os-vertical.mp4',
    preview: '/assets/color-os-vertical-preview.mp4',
    layout: 'portrait',
    description: '负责场景搭建、动画制作、灯光渲染、合成 AI 手部动画。',
  },
  {
    title: '美团X玛莎拉蒂',
    tag: 'Video / 3D / Motion',
    image: '/assets/hero-poster.svg',
    video: '/assets/meituan-project-full.mp4',
    preview: '/assets/meituan-project-preview.mp4',
    layout: 'portrait',
    description: '负责 SC001 镜头制作。',
  },
  {
    title: '雅诗兰黛DW气垫',
    tag: 'AIGC / Visual Film',
    image: '/assets/project-aigc.svg',
    video: '/assets/dw-project-full.mp4',
    preview: '/assets/dw-project-preview.mp4',
    layout: 'portrait',
    description: '负责全片场景搭建、灯光渲染合成，剪辑输出。',
  },
  {
    title: 'DIGRUN',
    tag: 'Video / 3D / Motion',
    image: '/assets/hero-poster.svg',
    video: '/assets/digrun-project-full.mp4',
    preview: '/assets/digrun-project-preview.mp4',
    layout: 'portrait',
    description: 'DIGRUN app概念视频。',
  },
  {
    title: '雅诗兰黛',
    tag: 'AIGC / Visual Film',
    image: '/assets/project-aigc.svg',
    video: '/assets/estee-lauder-project-full.mp4',
    preview: '/assets/estee-lauder-project-preview.mp4',
    layout: 'portrait',
    description: '负责特效部分制作。',
  },
];

const selfProjects = [
  {
    title: 'iPhone AIR',
    type: 'Video / Motion',
    mediaType: 'video',
    src: '/assets/iphone-air-self-full.mp4',
    preview: '/assets/iphone-air-self-preview.mp4',
    poster: '/assets/hero-poster.svg',
    description: '自研动态视觉实验，用于测试镜头节奏、材质氛围与界面化视觉语言。',
  },
  {
    title: '火尖枪',
    type: 'Image / AIGC',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/nezha2-self-full.mp4',
    preview: '/assets/nezha2-self-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: '受到台剧《乩身》的启发，创作了《火尖枪》短片。使用 Houdini 制作特效，导入 C4D，Redshift 渲染，并 Nuke 合成。',
  },
  {
    title: '世界渲染大赛',
    type: 'Video / 3D',
    mediaType: 'video',
    src: '/assets/render-contest-self.mp4',
    preview: '/assets/render-contest-self-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: '全流程制作 CG 短片。',
  },
  {
    title: 'DATSUN',
    type: 'Vertical Video',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/datsun-2047-self.mp4',
    preview: '/assets/datsun-2047-self-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: '尝试二维+3D结合。',
  },
  {
    title: '手机产品渲染',
    type: 'Product / Render',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/phone-render-self-full.mp4',
    preview: '/assets/phone-render-self-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: '自研手机产品视觉渲染，探索产品材质、灯光和镜头展示。',
  },
];

const aigcCommercialProjects = [
  {
    title: '碧欧泉',
    type: 'AIGC / Commercial',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/aigc-biotherm-full.mp4',
    preview: '/assets/aigc-biotherm-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: 'AIGC 商业视觉项目，负责画面生成、动态视觉与成片输出。',
  },
  {
    title: '1664',
    type: 'AIGC / Commercial',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/aigc-1664-full.mp4',
    preview: '/assets/aigc-1664-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: 'AIGC 商业视觉项目，负责画面生成、动态视觉与成片输出。',
  },
  {
    title: '伊利',
    type: 'AIGC / Commercial',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/aigc-yili-full.mp4',
    preview: '/assets/aigc-yili-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: 'AIGC 商业视觉项目，负责画面生成、动态视觉与成片输出。',
  },
  {
    title: '嘉士伯',
    type: 'AIGC / Commercial',
    mediaType: 'video',
    layout: 'portrait',
    src: '/assets/aigc-carlsberg-full.mp4',
    preview: '/assets/aigc-carlsberg-preview.mp4',
    poster: '/assets/project-aigc.svg',
    description: 'AIGC 商业视觉项目，负责画面生成、动态视觉与成片输出。',
  },
];

const artTests = [
  { title: 'Material Test 01', type: 'Vertical Image', src: '/assets/art-watch-01.webp', description: 'Watch art test.' },
  { title: 'Lighting Test 02', type: 'Vertical Image', src: '/assets/art-watch-02.webp', description: 'Watch art test.' },
  { title: 'Lookdev Test 03', type: 'Vertical Image', src: '/assets/art-watch-03.webp', description: 'Watch art test.' },
  { title: 'AI Visual Test 04', type: 'Vertical Image', src: '/assets/art-watch-04.webp', description: 'Watch art test.' },
  { title: 'Watch Test 05', type: 'Vertical Image', src: '/assets/art-watch-05.webp', description: 'Watch art test.' },
  { title: 'Watch Test 06', type: 'Vertical Image', src: '/assets/art-watch-06.webp', description: 'Watch art test.' },
  { title: 'Watch Test 07', type: 'Vertical Image', src: '/assets/art-watch-07.webp', description: 'Watch art test.' },
  { title: 'Watch Test 08', type: 'Vertical Image', src: '/assets/art-watch-08.webp', description: 'Watch art test.' },
  { title: 'Watch Test 09', type: 'Vertical Image', src: '/assets/art-watch-09.webp', description: 'Watch art test.' },
  { title: 'Watch Test 10', type: 'Vertical Image', src: '/assets/art-watch-10.webp', description: 'Watch art test.' },
  { title: 'C4D Toon Test 01', type: 'Vertical Image', src: '/assets/art-mecha-01.jpg', description: 'C4D toon render art test.' },
  { title: 'C4D Toon Test 02', type: 'Vertical Image', src: '/assets/art-mecha-02.jpg', description: 'C4D toon render art test.' },
  { title: 'C4D Toon Test 03', type: 'Vertical Image', src: '/assets/art-mecha-03.jpg', description: 'C4D toon render art test.' },
  { title: 'Benz Render 01', type: 'Horizontal Image', layout: 'horizontal', src: '/assets/art-benchi-01.webp', description: 'Mercedes-Benz render art test.' },
  { title: 'Benz Render 02', type: 'Horizontal Image', layout: 'horizontal', src: '/assets/art-benchi-02.webp', description: 'Mercedes-Benz render art test.' },
];

const strengths = [
  {
    title: '3D 商业视觉',
    text: '熟悉产品视觉从资产、材质、灯光到镜头输出的完整制作链路。',
  },
  {
    title: '动态与合成',
    text: '能够制作动态 Layout、视频 Demo，并完成 NUKE 后期合成与画面收口。',
  },
  {
    title: 'AIGC 工作流',
    text: '具备 AI+3D 商业项目经验，能将生成式视觉融入广告创意执行。',
  },
  {
    title: '审美与落地',
    text: '对品牌质感、画面秩序和商业表达有判断力，适应不同项目节奏。',
  },
];

const softwareStack = [
  { name: 'C4D', logo: '/assets/logo-c4d.png' },
  { name: 'Octane', logo: '/assets/logo-octane.png' },
  { name: 'Redshift', logo: '/assets/logo-redshift.png' },
  { name: 'Houdini', logo: '/assets/logo-houdini.png' },
  { name: 'NUKE', logo: '/assets/logo-nuke.png' },
  { name: 'MD', logo: '/assets/logo-md.png' },
  { name: 'AE', logo: '/assets/logo-ae.png' },
];

function App() {
  const rootRef = useRef(null);
  const artTrackRef = useRef(null);
  const artSliderRef = useRef(null);
  const artAutoPausedRef = useRef(false);
  const artDragRef = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showEntry, setShowEntry] = useState(true);
  const [entryLeaving, setEntryLeaving] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const verticalArtTests = artTests.filter((item) => item.layout !== 'horizontal');
  const horizontalArtTests = artTests.filter((item) => item.layout === 'horizontal');

  const enterSite = () => {
    setContentReady(true);
    setEntryLeaving(true);
    window.setTimeout(() => {
      setShowEntry(false);
    }, 900);
  };

  useLayoutEffect(() => {
    if (!contentReady) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.motion-reveal, .card-reveal, .image-reveal, .sectionBigTitle', {
          clearProps: 'all',
          opacity: 1,
        });
        return;
      }

      gsap.set('.openingCurtain', { scaleY: 1, transformOrigin: 'top center' });
      gsap.set('.nav', { y: -80, opacity: 0 });
      gsap.set('.heroIntro, .heroServices span, .heroKicker, .heroPreview', {
        y: 34,
        opacity: 0,
      });
      gsap.set('.heroVideo', { scale: 1.18, filter: 'saturate(1.45) contrast(1.18) brightness(0.62)' });
      gsap.set('.heroTitleMask', { clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.heroNameCn', {
        yPercent: 105,
        scaleX: 0.62,
        filter: 'blur(12px)',
        transformOrigin: '50% 80%',
      });

      const opening = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.15,
      });

      opening
        .to('.openingCurtain', {
          scaleY: 0,
          duration: 1.35,
          ease: 'expo.inOut',
        })
        .to('.heroVideo', {
          scale: 1,
          filter: 'saturate(1.25) contrast(1.08) brightness(0.9)',
          duration: 2.15,
        }, '<0.08')
        .to('.nav', {
          y: 0,
          opacity: 1,
          duration: 1.1,
        }, '<0.35')
        .to('.heroTitleMask', {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.28,
          ease: 'expo.inOut',
        }, '<0.18')
        .to('.heroNameCn', {
          yPercent: 0,
          scaleX: 1,
          filter: 'blur(0px)',
          duration: 1.45,
          ease: 'expo.out',
        }, '<0.18')
        .to('.heroKicker', {
          y: 0,
          opacity: 1,
          duration: 0.95,
        }, '<0.22')
        .to('.heroIntro', {
          y: 0,
          opacity: 1,
          duration: 1.05,
        }, '<0.12')
        .to('.heroServices span', {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
        }, '<0.08')
        .to('.heroPreview', {
          y: 0,
          opacity: 1,
          duration: 1,
        }, '<0.2');

      gsap.to('.heroVideo', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      ScrollTrigger.create({
        trigger: '#profile',
        start: 'top top+=12',
        onEnter: () => document.querySelector('.nav')?.classList.add('is-floating'),
        onLeaveBack: () => document.querySelector('.nav')?.classList.remove('is-floating'),
      });

      gsap.utils.toArray('.section').forEach((section) => {
        const title = section.querySelector('.sectionBigTitle');
        const label = section.querySelector('.sectionLabel');
        const heading = section.querySelector('.sectionHeader h2, .profileContent h2, .contactInner h2');
        const cards = section.querySelectorAll('.card-reveal');
        const images = section.querySelectorAll('.projectMedia, .selfMedia, .portraitPhoto');

        if (title) {
          gsap.fromTo(title,
            { xPercent: -24, scaleX: 0.76, opacity: 0, filter: 'blur(10px)' },
            {
              xPercent: 0,
              scaleX: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.45,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
                once: true,
              },
            });
        }

        gsap.fromTo([label, heading].filter(Boolean),
          { y: 54, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.05,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 68%',
              once: true,
            },
          });

        if (cards.length) {
          gsap.fromTo(cards,
            { y: 86, opacity: 0, scale: 0.94, rotateX: -10, filter: 'blur(10px)' },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              filter: 'blur(0px)',
              duration: 1.25,
              ease: 'expo.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: section,
                start: 'top 56%',
                once: true,
              },
            });
        }

        images.forEach((image) => {
          const card = image.closest('.projectGlow, .selfProjectGlow, .portraitWrap') || image.parentElement;

          gsap.fromTo(image,
            { clipPath: 'inset(0 0 100% 0)', scale: 1.18 },
            {
              clipPath: 'inset(0 0 0% 0)',
              scale: 1,
              duration: 1.35,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                once: true,
              },
            });

          gsap.to(image, {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [contentReady]);

  useEffect(() => {
    if (!contentReady) return undefined;
    const track = artTrackRef.current;
    if (!track) return undefined;

    const normalizeScroll = () => {
      const loopPoint = track.scrollWidth / 2;
      if (!loopPoint) return;
      if (track.scrollLeft >= loopPoint) {
        track.scrollLeft -= loopPoint;
      }
    };

    const syncSlider = () => {
      const slider = artSliderRef.current;
      const loopPoint = track.scrollWidth / 2;
      if (!slider || !loopPoint) return;
      slider.value = String(((track.scrollLeft % loopPoint) / loopPoint) * 100);
    };

    let raf = 0;
    const tick = () => {
      if (!artAutoPausedRef.current && !artDragRef.current.active) {
        track.scrollLeft += 0.72;
        normalizeScroll();
      }
      syncSlider();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [contentReady]);

  const handleArtPointerDown = (event) => {
    const track = artTrackRef.current;
    if (!track) return;
    artAutoPausedRef.current = true;
    artDragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.setPointerCapture?.(event.pointerId);
  };

  const handleArtPointerMove = (event) => {
    const track = artTrackRef.current;
    const drag = artDragRef.current;
    if (!track || !drag.active) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 5) drag.moved = true;
    track.scrollLeft = drag.scrollLeft - delta;
  };

  const handleArtPointerUp = (event) => {
    const track = artTrackRef.current;
    if (track) {
      const loopPoint = track.scrollWidth / 2;
      if (loopPoint && track.scrollLeft >= loopPoint) {
        track.scrollLeft -= loopPoint;
      }
      track.releasePointerCapture?.(event.pointerId);
    }
    artDragRef.current.active = false;
  };

  const handleArtSliderInput = (event) => {
    const track = artTrackRef.current;
    if (!track) return;
    artAutoPausedRef.current = true;
    const loopPoint = track.scrollWidth / 2;
    track.scrollLeft = (loopPoint * Number(event.currentTarget.value)) / 100;
  };

  const updateArtSliderFromPointer = (event) => {
    const slider = artSliderRef.current;
    const track = artTrackRef.current;
    if (!slider || !track) return;
    const rect = slider.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const value = rect.width ? (x / rect.width) * 100 : 0;
    const loopPoint = track.scrollWidth / 2;
    slider.value = String(value);
    track.scrollLeft = (loopPoint * value) / 100;
  };

  const handleArtSliderPointerDown = (event) => {
    artAutoPausedRef.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateArtSliderFromPointer(event);
  };

  const handleArtSliderPointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) return;
    updateArtSliderFromPointer(event);
  };

  const handleArtSliderPointerEnd = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    artAutoPausedRef.current = false;
  };

  return (
    <main ref={rootRef}>
      {showEntry ? (
        <section className={`entryGate ${entryLeaving ? 'isLeaving' : ''}`} aria-label="进入网站">
          <video className="entryGateVideo" autoPlay muted loop playsInline poster="/assets/hero-poster.svg" aria-hidden="true">
            <source src="/assets/sy1-hero-preview.mp4" type="video/mp4" />
          </video>
          <div className="entryGateShade" aria-hidden="true" />
          <div className="entryGateContent">
            <p>PORTFOLIO 2026</p>
            <h1>WU BIN</h1>
            <button type="button" onClick={enterSite}>
              ENTER
            </button>
          </div>
        </section>
      ) : null}
      {contentReady ? (
        <>
      <div className="openingCurtain" aria-hidden="true" />
      <section className="hero" id="top">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-poster.svg"
          aria-hidden="true"
        >
          <source src="/assets/sy1-hero-preview.mp4" type="video/mp4" />
        </video>
        <div className="motionBackdrop" aria-hidden="true" />
        <nav className="nav shell" aria-label="主导航">
          <a className="brand" href="#top" aria-label="返回首页">
            WB
          </a>
          <div className="navLinks">
            <a href="#profile">经历</a>
            <a href="#projects">项目</a>
            <a href="#strengths">优势</a>
            <a href="#contact">联系</a>
          </div>
          <a className="navContact" href={`mailto:${profile.email}`}>
            Contact
          </a>
        </nav>
        <div className="heroInner shell">
          <div className="heroIntro">
            <p>
              以 3D、动态影像与 AI 视觉为品牌和产品建立具有商业质感的画面表达。
            </p>
          </div>
          <div className="heroServices" aria-label="核心能力">
            <span>3D Visual Design</span>
            <span>AIGC Campaign</span>
            <span>Motion Layout</span>
            <span>Lighting / Render</span>
          </div>
          <div className="heroTitleBlock">
            <p className="heroKicker">WU BIN / PORTFOLIO 2026</p>
            <div className="heroTitleMask">
              <h1 className="heroNameCn">吴斌</h1>
            </div>
            <div className="heroPreview" aria-hidden="true">
              <video autoPlay muted loop playsInline>
                <source src="/assets/sy1-hero-preview.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <div className="belowHeroSurface">
        <Grainient
          className="belowHeroGrainient"
          color1="#7e1414"
          color2="#1a0809"
          color3="#050608"
          timeSpeed={0.14}
          colorBalance={-0.12}
          warpStrength={0.75}
          warpFrequency={3.8}
          warpSpeed={1.2}
          warpAmplitude={70}
          blendAngle={-24}
          blendSoftness={0.1}
          rotationAmount={320}
          noiseScale={1.55}
          grainAmount={0.12}
          grainScale={2.8}
          contrast={1.28}
          saturation={0.86}
          centerX={-0.08}
          centerY={0.05}
          zoom={0.88}
        />
        <section className="profile shell section" id="profile">
          <div className="sectionBigTitle" aria-hidden="true">Profile</div>
          <div className="sectionLabel">Profile</div>
          <div className="portraitWrap card-reveal">
            <img className="image-reveal portraitPhoto" loading="lazy" decoding="async" src="/assets/portrait-wubin.jpg" alt="吴斌人物照片" />
          </div>
          <div className="profileContent">
            <p className="eyebrow">3D Designer / AI Visual Creator</p>
            <h2>以商业视觉为目标，把创意方案转译成可落地的高质感画面。</h2>
            <p className="intro">{profile.intro}</p>
            <div className="contactLines" aria-label="联系方式">
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>{profile.location}</span>
            </div>
            <div className="statsGrid">
              {stats.map((item) => (
                <BorderGlow
                  className="statGlow card-reveal"
                  key={item.label}
                  edgeSensitivity={22}
                  glowColor="0 82 56"
                  backgroundColor="rgba(18, 9, 10, 0.78)"
                  borderRadius={8}
                  glowRadius={28}
                  glowIntensity={0.8}
                  coneSpread={22}
                  colors={['#db0505', '#ff4a4a', '#6f0202']}
                  fillOpacity={0.32}
                >
                  <div className="stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <BorderGlow
                className="timelineGlow card-reveal"
                key={item.company}
                edgeSensitivity={24}
                glowColor="0 82 56"
                backgroundColor="rgba(15, 9, 10, 0.82)"
                borderRadius={8}
                glowRadius={34}
                glowIntensity={0.92}
                coneSpread={24}
                animated
                colors={['#db0505', '#ff6b6b', '#7b0303']}
                fillOpacity={0.36}
              >
                <article className="timelineItem">
                  <span>{item.period}</span>
                  <h3>{item.company}</h3>
                  <p className="role">{item.role}</p>
                  <p>{item.detail}</p>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="shell sectionBigTitle" aria-hidden="true">Selected Works</div>
          <div className="shell sectionHeader">
            <div className="sectionLabel">Selected Works</div>
            <h2>CG商业项目</h2>
          </div>
          <div className="projectGrid shell">
            {projects.map((project, index) => (
              <BorderGlow
                className="projectGlow card-reveal"
                key={project.title}
                edgeSensitivity={24}
                glowColor="0 82 56"
                backgroundColor="rgba(13, 7, 8, 0.86)"
                borderRadius={8}
                glowRadius={38}
                glowIntensity={0.95}
                coneSpread={24}
                colors={['#db0505', '#ff4a4a', '#7b0303']}
                fillOpacity={0.34}
              >
              <article className={`projectCard ${project.layout === 'portrait' ? 'projectCardPortrait' : ''}`}>
                  {project.video ? (
                    <LazyVideo
                      className={`projectMedia image-reveal ${project.layout === 'portrait' ? 'projectMediaPortrait' : ''}`}
                      src={project.preview || project.video}
                      role="button"
                      tabIndex={0}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.image}
                      onClick={() => setActiveVideo({ ...project, src: project.video })}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveVideo({ ...project, src: project.video });
                        }
                      }}
                      aria-label={`${project.title} 项目视频展示`}
                    />
                  ) : (
                    <img
                      className={`projectMedia image-reveal ${project.layout === 'portrait' ? 'projectMediaPortrait' : ''}`}
                      src={project.image}
                      loading="lazy"
                      decoding="async"
                      alt={`${project.title} 项目视觉占位图`}
                    />
                  )}
                <div className="projectInfo">
                    <span>{project.tag}</span>
                    <h3>
                      {String(index + 1).padStart(2, '0')} / {project.title}
                    </h3>
                    <p>{project.description}</p>
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="selfWorks section" id="self-works">
          <div className="shell sectionBigTitle" aria-hidden="true">Self Projects</div>
          <div className="shell sectionHeader">
            <div className="sectionLabel">Self Projects</div>
            <h2>自研项目</h2>
          </div>
          <div className="selfProjectGrid shell">
            {selfProjects.map((item, index) => (
              <BorderGlow
                className="selfProjectGlow card-reveal"
                key={item.title}
                edgeSensitivity={24}
                glowColor="0 82 56"
                backgroundColor="rgba(13, 7, 8, 0.86)"
                borderRadius={8}
                glowRadius={36}
                glowIntensity={0.88}
                coneSpread={24}
                colors={['#db0505', '#ff4a4a', '#7b0303']}
                fillOpacity={0.32}
              >
                <article className={`selfProjectCard ${item.layout === 'portrait' ? 'selfProjectCardPortrait' : ''}`}>
                  <div
                    className={`selfMediaFrame ${item.layout === 'portrait' ? 'selfMediaFramePortrait' : ''}`}
                    role={item.mediaType === 'video' ? 'button' : undefined}
                    tabIndex={item.mediaType === 'video' ? 0 : undefined}
                    onClick={() => item.mediaType === 'video' && setActiveVideo(item)}
                    onKeyDown={(event) => {
                      if (item.mediaType === 'video' && (event.key === 'Enter' || event.key === ' ')) {
                        event.preventDefault();
                        setActiveVideo(item);
                      }
                    }}
                  >
                    {item.mediaType === 'video' ? (
                      <LazyVideo
                        className="selfMedia image-reveal"
                        src={item.preview || item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={item.poster}
                        aria-label={`${item.title} 自研项目视频`}
                      />
                    ) : (
                      <img className="selfMedia image-reveal" loading="lazy" decoding="async" src={item.src} alt={`${item.title} 自研项目图片`} />
                    )}
                  </div>
                  <div className="selfProjectInfo">
                    <span>{item.type}</span>
                    <h3>
                      {String(index + 1).padStart(2, '0')} / {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="aigcCommercial section" id="aigc-commercial">
          <div className="shell sectionBigTitle" aria-hidden="true">AIGC Works</div>
          <div className="shell sectionHeader">
            <div className="sectionLabel">AIGC Commercial</div>
            <h2>AIGC商业项目</h2>
          </div>
          <div className="aigcCommercialGrid shell">
            {aigcCommercialProjects.map((item, index) => (
              <BorderGlow
                className="aigcCommercialGlow card-reveal"
                key={item.title}
                edgeSensitivity={24}
                glowColor="0 82 56"
                backgroundColor="rgba(13, 7, 8, 0.86)"
                borderRadius={8}
                glowRadius={36}
                glowIntensity={0.9}
                coneSpread={24}
                colors={['#db0505', '#ff4a4a', '#7b0303']}
                fillOpacity={0.32}
              >
                <article className="aigcCommercialCard">
                  <div
                    className="aigcCommercialMediaFrame"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveVideo(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveVideo(item);
                      }
                    }}
                  >
                    <LazyVideo
                      className="aigcCommercialMedia image-reveal"
                      src={item.preview || item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={item.poster}
                      aria-label={`${item.title} AIGC商业项目视频`}
                    />
                  </div>
                  <div className="aigcCommercialInfo">
                    <span>{item.type}</span>
                    <h3>
                      {String(index + 1).padStart(2, '0')} / {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="artTests section" id="art-tests">
          <div className="shell sectionBigTitle" aria-hidden="true">Art Tests</div>
          <div className="shell sectionHeader">
            <div className="sectionLabel">Art Tests</div>
            <h2>美术测试</h2>
          </div>
          <div
            className="artTestScroller shell"
            ref={artTrackRef}
            onMouseEnter={() => {
              artAutoPausedRef.current = true;
            }}
            onMouseLeave={() => {
              artAutoPausedRef.current = false;
            }}
            onPointerDown={handleArtPointerDown}
            onPointerMove={handleArtPointerMove}
            onPointerUp={handleArtPointerUp}
            onPointerCancel={handleArtPointerUp}
            aria-label="美术测试作品集，可拖拽横向浏览"
          >
            {[...verticalArtTests, ...verticalArtTests].map((item, index) => (
              <BorderGlow
                className="artTestGlow card-reveal"
                key={`${item.title}-${index}`}
                edgeSensitivity={22}
                glowColor="0 82 56"
                backgroundColor="rgba(13, 7, 8, 0.86)"
                borderRadius={8}
                glowRadius={34}
                glowIntensity={0.84}
                coneSpread={22}
                colors={['#db0505', '#ff4a4a', '#7b0303']}
                fillOpacity={0.3}
              >
                <article className="artTestCard">
                  <div
                    className="artTestImageFrame"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (!artDragRef.current.moved) setActiveImage(item);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveImage(item);
                      }
                    }}
                    aria-label={`查看 ${item.title}`}
                  >
                    <img className="artTestImage image-reveal" loading="lazy" decoding="async" src={item.src} alt={`${item.title} 美术测试图片`} />
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
          <div className="artTestSliderWrap shell" aria-label="美术测试图片快速浏览">
            <input
              ref={artSliderRef}
              className="artTestSlider"
              type="range"
              min="0"
              max="100"
              step="0.1"
              defaultValue="0"
              onInput={handleArtSliderInput}
              onPointerDown={handleArtSliderPointerDown}
              onPointerMove={handleArtSliderPointerMove}
              onPointerUp={handleArtSliderPointerEnd}
              onPointerCancel={handleArtSliderPointerEnd}
              onBlur={() => {
                artAutoPausedRef.current = false;
              }}
              aria-label="快速浏览美术测试图片"
            />
          </div>
          <div className="artTestHorizontalRow shell" aria-label="横版美术测试图片">
            {horizontalArtTests.map((item) => (
              <BorderGlow
                className="artTestGlowHorizontal card-reveal"
                key={item.title}
                edgeSensitivity={22}
                glowColor="0 82 56"
                backgroundColor="rgba(13, 7, 8, 0.86)"
                borderRadius={8}
                glowRadius={34}
                glowIntensity={0.84}
                coneSpread={22}
                colors={['#db0505', '#ff4a4a', '#7b0303']}
                fillOpacity={0.3}
              >
                <article className="artTestCard">
                  <div
                    className="artTestImageFrame artTestImageFrameHorizontal"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveImage(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveImage(item);
                      }
                    }}
                    aria-label={`查看 ${item.title}`}
                  >
                    <img className="artTestImage image-reveal" loading="lazy" decoding="async" src={item.src} alt={`${item.title} 美术测试图片`} />
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="strengths shell section" id="strengths">
          <div className="sectionBigTitle" aria-hidden="true">Capabilities</div>
          <div className="sectionHeader">
            <div className="sectionLabel">Capabilities</div>
            <h2>个人优势</h2>
          </div>
          <div className="strengthGrid">
            {strengths.map((item) => (
              <BorderGlow
                className="strengthGlow card-reveal"
                key={item.title}
                edgeSensitivity={22}
                glowColor="0 82 56"
                backgroundColor="rgba(15, 8, 9, 0.84)"
                borderRadius={8}
                glowRadius={30}
                glowIntensity={0.78}
                coneSpread={22}
                colors={['#db0505', '#ff5a5a', '#650202']}
                fillOpacity={0.3}
              >
                <article className="strengthCard">
                  <span />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="softwareStack shell section" id="software">
          <div className="sectionHeader softwareHeader">
            <div className="sectionLabel">Software</div>
            <h2>工作软件</h2>
          </div>
          <div className="softwareGrid" aria-label="工作软件列表">
            {softwareStack.map((item) => (
              <BorderGlow
                className="softwareGlow card-reveal"
                key={item.name}
                edgeSensitivity={20}
                glowColor="0 82 56"
                backgroundColor="rgba(15, 8, 9, 0.8)"
                borderRadius={8}
                glowRadius={24}
                glowIntensity={0.68}
                coneSpread={20}
                colors={['#db0505', '#ff5a5a', '#650202']}
                fillOpacity={0.24}
              >
                <article className="softwareCard">
                  <img src={item.logo} alt={`${item.name} logo`} loading="lazy" decoding="async" />
                  <span>{item.name}</span>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="contactFinal" id="contact">
          <div className="shell contactInner">
            <div className="sectionBigTitle" aria-hidden="true">Contact</div>
            <h2>联系方式</h2>
            <div className="contactOnly">
              <div className="finalActions" aria-label="联系方式">
                <a href={`tel:${profile.phone}`}>
                  <span>联系电话</span>
                  {profile.phone}
                </a>
                <a href={`mailto:${profile.email}`}>
                  <span>邮箱</span>
                  {profile.email}
                </a>
              </div>
              <div className="wechatQrBlock">
                <img src="/assets/wechat-qr.png" alt="微信二维码" loading="lazy" decoding="async" />
                <span>微信二维码</span>
              </div>
            </div>
          </div>
        </section>
      </div>
        </>
      ) : null}

      {activeVideo ? (
        <div className="videoModal" role="dialog" aria-modal="true" aria-label={`${activeVideo.title} 播放窗口`}>
          <button className="videoModalBackdrop" type="button" aria-label="关闭视频" onClick={() => setActiveVideo(null)} />
          <div className={`videoModalPanel ${activeVideo.layout === 'portrait' ? 'videoModalPanelPortrait' : ''}`}>
            <button className="videoModalClose" type="button" onClick={() => setActiveVideo(null)} aria-label="关闭视频">
              Close
            </button>
            <video
              className="videoModalPlayer"
              src={activeVideo.src || activeVideo.video}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}

      {activeImage ? (
        <div className="imageModal" role="dialog" aria-modal="true" aria-label={`${activeImage.title} 图片预览`}>
          <button className="imageModalBackdrop" type="button" aria-label="关闭图片" onClick={() => setActiveImage(null)} />
          <div className="imageModalPanel">
            <button className="videoModalClose" type="button" onClick={() => setActiveImage(null)} aria-label="关闭图片">
              Close
            </button>
            <img src={activeImage.src} alt={`${activeImage.title} 放大预览`} />
          </div>
        </div>
      ) : null}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
