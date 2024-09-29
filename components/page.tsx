"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const translations = {
  en: {
    skill: "Skill",
    project: "Project",
    career: "Career",
    contact: "Contact",
    name: "Full Name",
    email: "Email",
    message: "Message",
    send: "Send",
    viewDetails: "View Details",
    projectDescription:
      "A brief description of the project goes here. Describe the technologies used and the project outcomes.",
    programmingLanguages: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    tools: "Tools & Technologies",
    design: "Design & 3D",
    wsl: "WSL (Windows Subsystem for Linux)",
    linux: "Linux",
    technologies: "Technologies",
    blockchain: "Blockchain",
    advancedTechnologies: "Advanced Technologies",
    generativeAI: "Generative AI",
    introduction: "Introduction",
    introText: [
      "As a former structural designer for wooden buildings, I realized the need for more efficient design processes in the construction industry.",
      "This realization led me to pursue programming and AI technologies.",
      "I'm currently expanding my skills in various programming languages and technologies to bridge the gap between construction and innovative tech solutions.",
    ],
    skillsIntro: [
      "My skill set ranges from web development to advanced technologies.",
      "While I'm still learning Solidity and Rust, I'm proficient in creating projects with HTML&CSS, JavaScript, TypeScript, Python, and React.",
    ],
    projectsIntro:
      "Here are some of the projects I've worked on, showcasing my skills in various technologies:",
    careerIntro: "My journey from architecture to programming:",
    contactIntro:
      "I'm always open to new opportunities and collaborations. Feel free to reach out!",
    educationTitle: "Education",
    educationKyoto: "Kyoto College of Architecture",
    educationOU: "The Open University of Japan",
    major: "Major: Architecture",
    planningToEnroll: "Planning to enroll (3rd year transfer)",
    jobTitle: "Programmer & Creator",
    companyName: "Defense Design Co., Ltd.",
    confirmTitle: "Confirmation",
    back: "Back",
    confirm: "Confirm",
    fullName: "Yamada Ichiban",
    contactName: "Full Name or Company Name",
  },
  ja: {
    skill: "スキル",
    project: "プロジェクト",
    career: "経歴",
    contact: "お問い合わせ",
    name: "氏名",
    email: "メールアドレス",
    message: "メッセージ",
    send: "送信",
    viewDetails: "詳細を見る",
    projectDescription:
      "プロジェクトの簡単な説明がここに入ります。使用した技術やプロジェクトの成果などを記述します。",
    programmingLanguages: "プログラミング言語",
    frameworks: "フレームワーク & ライブラリ",
    tools: "ツール & テクノロジー",
    design: "デザイン & 3D",
    wsl: "WSL（Windows Subsystem for Linux）",
    linux: "Linux",
    technologies: "テクノロジー",
    blockchain: "ブロックチェーン",
    advancedTechnologies: "先端技術",
    generativeAI: "生成AI",
    introduction: "自己紹介",
    introText: [
      "木造建築の構造設計者として働く中で、建設業界におけるより効率的な設計プロセスの必要性を実感しました。",
      "この経験から、プログラミングやAI技術、Blockchain技術の習得を決意しました。",
      "現在、様々なプログラミング言語や技術を学び、ゲーム開発、建設業界、不動産業界、金融業界等の革新的なテクノロジーソリューションの架け橋となり社会的に役立つことを目指しています。",
    ],
    skillsIntro: [
      "私のスキルセットはウェブ開発から先端技術まで幅広く及びます。",
      "SolidityとRustはまだ学習中ですが、HTML&CSS、JavaScript、TypeScript、Python、Reactを使用したプロジェクト制作には自信があります。",
    ],
    projectsIntro:
      "以下は、私が手がけたプロジェクトの一部で、様々な技術を活用しています：",
    careerIntro: "建築から情報技術への私のキャリアの軌跡：",
    contactIntro:
      "新しい機会や協力のご提案をお待ちしています。お気軽にご連絡ください。",
    educationTitle: "学歴",
    educationKyoto: "京都建築専門学校",
    educationOU: "放送大学",
    major: "専攻：建築科",
    planningToEnroll: "編入学予定（3年次）",
    jobTitle: "プログラマー & クリエイター",
    companyName: "(株)デファンス設計",
    confirmTitle: "確認",
    back: "戻る",
    confirm: "確認",
    fullName: "山田 一番",
    contactName: "氏名または企業名",
  },
};

const skillCategories = {
  programmingLanguages: [
    "HTML&CSS",
    "JavaScript",
    "PHP",
    "Python",
    "Rust",
    "C#",
  ],
  frameworks: ["React", "Node.js"],
  tools: ["Git", "AWS", "Firebase", "Docker", "WSL", "Linux"],
  advancedTechnologies: ["Blockchain", "Generative AI"],
  design: ["Blender", "Unity", "Illustrator", "Photoshop"],
};

export function Page() {
  const [lang, setLang] = useState<"en" | "ja">("ja");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isConfirming, setIsConfirming] = useState(false);

  const t = (key: keyof typeof translations.en): string =>
    translations[lang][key] as string;

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const renderSkillCategory = (category: keyof typeof skillCategories) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        key={category}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerChildren}
      >
        <motion.h3
          className="text-lg md:text-xl font-semibold mb-2 md:mb-4"
          variants={fadeInUp}
        >
          {t(category)}
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-8">
          {skillCategories[category].map((skill) => (
            <motion.div key={skill} variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center justify-center h-12 md:h-16 text-sm md:text-base">
                  {skill}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const handleConfirm = () => {
    // ここで実際の送信処理を行います
    console.log("送信データ:", formData);
    // 送信後の処理（例：フォームのリセット、完了メッセージの表示など）
    setFormData({ name: "", email: "", message: "" });
    setIsConfirming(false);
  };

  const handleBack = () => {
    setIsConfirming(false);
  };

  const ConfirmationScreen = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{t("confirmTitle")}</h3>
      <p>
        <strong>{t("name")}:</strong> {formData.name}
      </p>
      <p>
        <strong>{t("email")}:</strong> {formData.email}
      </p>
      <p>
        <strong>{t("message")}:</strong> {formData.message}
      </p>
      <div className="flex justify-between mt-6">
        <Button onClick={handleBack} variant="outline">
          {t("back")}
        </Button>
        <Button onClick={handleConfirm}>{t("send")}</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* ヒーローセクション */}
      <motion.section
        className="py-20 md:py-32 text-center bg-gradient-to-b from-primary/10 to-background relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t("fullName")}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-muted-foreground"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t("jobTitle")}
        </motion.p>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="mailto:ichi9328@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </a>
          <a
            href="https://github.com/ichiburn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/ichiban-yamada-37937b305"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            variant="outline"
            size="sm"
            className="text-xs md:text-sm"
          >
            <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            {lang === "en" ? "日本語" : "English"}
          </Button>
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className="text-xs md:text-sm"
          >
            {theme === "light" ? (
              <Moon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            ) : (
              <Sun className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            )}
            {theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>
      </motion.section>

      {/* 自己紹介セクション */}
      <motion.section
        className="py-20 md:py-32 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            variants={fadeInUp}
          >
            {t("introduction")}
          </motion.h2>
          {(t("introText") as string[]).map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-lg mb-6 leading-relaxed"
              variants={fadeInUp}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.section>

      {/* スキルセクション */}
      <motion.section
        className="py-20 md:py-32 bg-secondary relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            variants={fadeInUp}
          >
            {t("skill")}
          </motion.h2>
          <div className="max-w-3xl mx-auto mb-12">
            {(t("skillsIntro") as string[]).map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-lg mb-4 leading-relaxed"
                variants={fadeInUp}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <div className="grid gap-8 md:gap-12">
            {Object.keys(skillCategories).map((category) =>
              renderSkillCategory(category as keyof typeof skillCategories)
            )}
          </div>
        </div>
      </motion.section>

      {/* プロジェクトセクション */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            {t("project")}
          </h2>
          <p className="text-lg mb-12 text-center max-w-3xl mx-auto">
            {t("projectsIntro")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <Card key={project}>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {lang === "en"
                      ? `Project ${project}`
                      : `プロジェクト ${project}`}
                  </h3>
                  <p className="mb-4 text-sm md:text-base">
                    {t("projectDescription")}
                  </p>
                  <Button className="text-sm md:text-base">
                    {t("viewDetails")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 経歴セクション */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            {t("career")}
          </h2>
          <p className="text-lg mb-12 text-center max-w-3xl mx-auto">
            {t("careerIntro")}
          </p>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold">
                  {t("jobTitle")}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {t("companyName")}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  2022-04 - 2024-03
                </p>
              </CardContent>
            </Card>
          </div>
          <h3 className="text-2xl font-bold mt-16 mb-8 text-center">
            {t("educationTitle")}
          </h3>
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-semibold">
                  {t("educationKyoto")}
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  {t("major")}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  - 2022-03
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-semibold">
                  {t("educationOU")}
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  {t("planningToEnroll")}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  2024-10 -
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            {t("contact")}
          </h2>
          <p className="text-lg mb-8 text-center">{t("contactIntro")}</p>
          {isConfirming ? (
            <ConfirmationScreen />
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder={t("contactName")}
                className="text-base"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder={t("email")}
                className="text-base"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Textarea
                name="message"
                placeholder={t("message")}
                className="text-base"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" className="w-full text-base">
                {t("confirm")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
