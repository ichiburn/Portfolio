"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { Progress } from "@/components/ui/progress";

const translations = {
  en: {
    skill: "Skills",
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
    copyright: "© 2024 Yamada Ichiban. All rights reserved.",
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
    copyright: "© 2024 Yamada Ichiban. All rights reserved.",
  },
};

const skillCategories = {
  programmingLanguages: [
    {
      name: "HTML&CSS",
      level: 90,
      color: "text-orange-500 dark:text-orange-400",
    },
    {
      name: "JavaScript",
      level: 85,
      color: "text-yellow-500 dark:text-yellow-400",
    },
    {
      name: "TypeScript",
      level: 80,
      color: "text-blue-500 dark:text-blue-400",
    },
    { name: "PHP", level: 70, color: "text-purple-500 dark:text-purple-400" },
    { name: "Python", level: 75, color: "text-green-500 dark:text-green-400" },
    { name: "Rust", level: 40, color: "text-red-500 dark:text-red-400" },
    { name: "Solidity", level: 30, color: "text-gray-500 dark:text-gray-400" },
    { name: "C#", level: 60, color: "text-indigo-500 dark:text-indigo-400" },
  ],
  frameworks: [
    { name: "React", level: 85, color: "text-blue-500 dark:text-blue-400" },
    { name: "Node.js", level: 80, color: "text-green-500 dark:text-green-400" },
  ],
  tools: [
    { name: "Git", level: 85, color: "text-red-500 dark:text-red-400" },
    { name: "AWS", level: 70, color: "text-orange-500 dark:text-orange-400" },
    {
      name: "Firebase",
      level: 75,
      color: "text-yellow-500 dark:text-yellow-400",
    },
    { name: "Docker", level: 65, color: "text-blue-500 dark:text-blue-400" },
    { name: "WSL", level: 80, color: "text-purple-500 dark:text-purple-400" },
    { name: "Linux", level: 75, color: "text-gray-500 dark:text-gray-400" },
  ],
  advancedTechnologies: [
    {
      name: "Blockchain",
      level: 50,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      name: "Generative AI",
      level: 60,
      color: "text-green-500 dark:text-green-400",
    },
  ],
  design: [
    {
      name: "Blender",
      level: 70,
      color: "text-orange-500 dark:text-orange-400",
    },
    { name: "Unity", level: 65, color: "text-gray-500 dark:text-gray-400" },
    {
      name: "Illustrator",
      level: 60,
      color: "text-yellow-500 dark:text-yellow-400",
    },
    { name: "Photoshop", level: 55, color: "text-blue-500 dark:text-blue-400" },
  ],
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

  const t = (key: keyof typeof translations.en): string | string[] =>
    translations[lang][key];

  useEffect(() => {
    // ローカルストレージからテーマを取得
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // テーマの変更を適用
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // ローカルストレージにテーマを保存
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = (container: any) => {
    console.log(container);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
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
        className="mb-8"
      >
        <motion.h3
          className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
          variants={fadeInUp}
        >
          {t(category)}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories[category].map((skill) => (
            <motion.div
              key={skill.name}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3"
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${skill.color}`}>
                  {skill.name}
                </span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`h-2.5 rounded-full ${
                    skill.color.replace("text-", "bg-").split(" ")[0]
                  }`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
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
              value: 40,
              density: {
                enable: true,
                area: 800,
              },
            },
            opacity: {
              value: 0.3,
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
        className="py-24 md:py-40 text-center relative z-10 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t("fullName")}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t("jobTitle")}
        </motion.p>
        <motion.div
          className="flex justify-center space-x-6 mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
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
        </motion.div>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
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
        </motion.div>
      </motion.section>

      {/* 他のセクション */}
      {["introduction", "skill", "project", "career", "contact"].map(
        (section, index) => (
          <motion.section
            key={section}
            className={`py-20 md:py-32 relative z-10 ${
              index % 2 === 0
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
                variants={fadeInUp}
              >
                {t(section)}
              </motion.h2>
              {section === "introduction" && (
                <div className="max-w-3xl mx-auto">
                  {Array.isArray(t("introText")) &&
                    t("introText").map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className="text-base md:text-lg mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
                        variants={fadeInUp}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                </div>
              )}
              {section === "skill" && (
                <>
                  <div className="max-w-3xl mx-auto mb-12">
                    {Array.isArray(t("skillsIntro")) &&
                      t("skillsIntro").map((paragraph, index) => (
                        <motion.p
                          key={index}
                          className="text-base md:text-lg mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
                          variants={fadeInUp}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                  </div>
                  <div className="grid gap-8 md:gap-12">
                    {Object.keys(skillCategories).map((category) =>
                      renderSkillCategory(
                        category as keyof typeof skillCategories
                      )
                    )}
                  </div>
                </>
              )}
              {section === "project" && (
                <>
                  <motion.p
                    className="text-base md:text-lg mb-12 text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
                    variants={fadeInUp}
                  >
                    {t("projectsIntro")}
                  </motion.p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((project) => (
                      <motion.div key={project} variants={fadeInUp}>
                        <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                          <CardContent className="p-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                              {lang === "en"
                                ? `Project ${project}`
                                : `プロジェクト ${project}`}
                            </h3>
                            <p className="mb-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
                              {t("projectDescription")}
                            </p>
                            <Button className="w-full">
                              {t("viewDetails")}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
              {section === "career" && (
                <>
                  <motion.p
                    className="text-base md:text-lg mb-12 text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
                    variants={fadeInUp}
                  >
                    {t("careerIntro")}
                  </motion.p>
                  <div className="max-w-3xl mx-auto">
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                          {t("jobTitle")}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                          {t("companyName")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                          2022-04 - 2024-03
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-center text-gray-900 dark:text-white">
                    {t("educationTitle")}
                  </h3>
                  <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <h4 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                          {t("educationKyoto")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                          {t("major")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                          - 2022-03
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <h4 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                          {t("educationOU")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                          {t("planningToEnroll")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                          2024-10 -
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
              {section === "contact" && (
                <>
                  <motion.p
                    className="text-base md:text-lg mb-8 text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
                    variants={fadeInUp}
                  >
                    {t("contactIntro")}
                  </motion.p>
                  <AnimatePresence mode="wait">
                    {isConfirming ? (
                      <motion.div
                        key="confirmation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ConfirmationScreen />
                      </motion.div>
                    ) : (
                      <motion.form
                        className="space-y-6 max-w-xl mx-auto"
                        onSubmit={handleSubmit}
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Input
                          name="name"
                          placeholder={t("contactName")}
                          className="text-sm md:text-base"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          name="email"
                          type="email"
                          placeholder={t("email")}
                          className="text-sm md:text-base"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <Textarea
                          name="message"
                          placeholder={t("message")}
                          className="text-sm md:text-base"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                        <Button type="submit" className="w-full text-base">
                          {t("confirm")}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.section>
        )
      )}

      {/* フッター */}
      <footer className="py-8 bg-white dark:bg-gray-900 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            {t("copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
