module.exports = {
  title: `yb-k.github.io`,
  description: `개발기록`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://yb-k.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `yb-k/yb-k.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  // TODO: GA 연동 고려
  author: {
    name: `김용범`,
    bio: {
      role: `개발자`,
      // description: ['사람에 가치를 두는', '능동적으로 일하는', '이로운 것을 만드는'],
      description: ['꾸준히 성장하는'],
      // description: [''],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/yb-k`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `yb.ctrlv@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      // TODO:  about / Timestamps 관련 메타 데이터
      // {
      //   date: '2023.01 ~',
      //   activity: '개인 블로그 개발 및 운영',
      //   links: {
      //     post: '/gatsby-starter-zoomkoding-introduction',
      //     github: 'https://yb-k.github.io/',
      //     demo: 'https://yb-k.github.io/',
      //   },
      // },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================

      // TODO: about / Project 수행에 대한 내용을 공유할 수 있음.

      // {
      //   title: '개발 블로그 테마 개발',
      //   description:
      //     '개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.',
      //   techStack: ['gatsby', 'react'],
      //   thumbnailUrl: 'blog.png',
      //   links: {
      //     post: '/introduction',
      //     github: 'https://github.com/yb-k/yb-k.github.io',
      //     demo: 'https://yb-k.github.io/',
      //   },
      // },
    ],
  },
};
