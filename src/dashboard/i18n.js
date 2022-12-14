import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "ar",
    debug: false,
    lng: "ar",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      "en-US": {
        translation: {
          description: {
            dashboardAppWelcome: "Hi, Welcome back",
            sideBarDashboard: "dashboard",
            sideBarUser: "users",
            sideBarSpecializations: "specializations",
            sideBarprivileges: "Roles",
            sideBarMedals: "medals",
            sideBarCountries: "countries",
            AccountPopoverLogout: "Logout",
            SearchBarSearchButton: "Search",
            SearchBarSearchPlaceholder: "Search…",
            UsersPageTitle: "Users",
            UsersPageNewUser: "  New User",
            NewUserDialogTitle: "Add New user",
            NewUserDialogUsername: "Username",
            NewUserDialogEmail: "Email",
            NewUserDialogPassword: "Password",
            NewUserDialogAccountType: "Accout Type",
            NewUserDialogAccountTypeAdmin: "Admin",
            NewUserDialogAccountTypeAdvertiser: "Advertiser",
            NewUserDialogAccountTypeInfluencer: "Influencer",
            NewUserDialogPrivileges: "Privilege",
            NewUserDialogSpecialization: "Specialization",
            NewUserDialogCountry: "Country",
            Cancel: "Cancel",
            Ok: "Ok",
            UsersPageSearchPlaceholder: "Search user...",
            UsersPageTableHeadUsername: "Username",
            UsersPageTableHeadEmail: "Email",
            UsersPageTableHeadPhoneNumber: "Phone Number",
            UsersPageTableHeadRole: "Role",
            UsersPageTableHeadStatus: "User Status",
            UsersPageTableHeadPendingBalance: "Pending Balance",
            UsersPageTableHeadOverallBalance: "Overall Balance",
            UsersPageTableHeadWithdrawBalance: "Withdraw Balance",
            UsersPageUserStatusWaitingVerification: "Waiting Verification",
            UsersPageUserStatusActive: " Active",
            UsersPageUserStatusDisabled: "Disabled",
            UsersPageEditUser: "Edit User",
            UsersPageLabelRowsPerPage: "Rows Per Page",
            EditUserStatusDialogTitle: "Edit User Status",
            EditUserStatusDialogLabel: "Status",
            EditUserBalanceDialogTitle: "Edit User Balance",
            SpecializationsPageTitle: "Specializations",
            SpecializationsPageAddNew: "New Specialization",
            SpecializationsPageSearchPlaceHolder: "Search Specialization...",

            NewSpecializationsDialogTitle: "Add New Specialization",
            NewSpecializationsDialogArName: "Arabic Name",
            NewSpecializationsDialogEnName: "English Name",
            EditSpecializationButton: "Edit Specialization",
            PrivilegepageTitle: "roles",
            PrivilegepageNewButton: "New Role",
            PrivilegepageEditButton: "Edit Role",

            NewPrivilegeName: "Role Name",
            NewPrivilegeRolesTitle: "Role Permissions",
            PrivilegepageSearchPlaceholder: "Search Role...",
            MedalsPageTabelHeadArName: "Arabic Name",
            MedalsPageTabelHeadEnName: "English Name",
            MedalsPageTabelimage: "Image",
            MedalsPageTitle: "Medals",
            MedalsPageNewButton: "New Medal",
            MedalsPageEditButton: "Edit Medals",
            MedalsPageSearchPlaceholder: "Search Medal...",
            MedalsPageNewImage: "Upload Medal Image",
            CountriesPageTitle: "Countries",
            CountriesPageNewButton: "New Country",
            CountriesPageSearchPlaceholder: "Search Country...",
            CountriesEditPageButton: "Edit Country",
            EmployeeSignIn: "Employee Sign In",
            heroOurServicesChip: "Our Services",
            heroWelcome: "Welcome",
            A: "A",
            AboutUs: "bout Us",
            O: "O",
            ourMission: "ur Mission",
            followusOnSocialMedia: "Follow Us on Social Media",
            s: "S",
            services: "ervices",
            p: "P",
            partners: "artners",
            ourBlog: "ur Blogs",
            readMore: "Read More",
            t: "t",
            testimonials: "estimonials",
            contactUs: "ontact Us",
            c: "C",
            ContactUs: "Contact Us",
            ContactUsName: "Your Name",
            ContactUsEmail: "Your Email",
            ContactUsHowCanWeHelp: " How can we help you?",
            ContactUsApplyForJob: "Apply for a job",
            ContactUsInquiry: "Inquiry",
            ContactUsYourMessage: "Your Message",
            ContactUsSend: "Send",
            ContactUsQuestions:
              "Questions ? We will put you on the right path.",
            ContactUsUploadUrCV: "Upload Your CV",

            ContactUsAddress:
              " Sheikh Zayed Rd-White Crown-Gloor 7- Office 706, 333388 Dubai, UAE",
            ContactUsAddress2:
              "Amir Ibn Adel Abdul Malik St., Amman, Jordan, Khalda, in front of the Modern English Schools - Al Jawhara Tower, Amman, JO",
            newsLetter:
              "Subscribe to Our Newsletter For Weekly Article Update.",
            newsLetterUpdates: "*  Will send you weekly updates.",
            Subscribe: "Subscribe",
            footerInfotmation: "INFORMATION",
            footerPrivacyPolicy: "Privacy Policy",
            footerTermsOfService: "Terms of Service",
            loginFormValidEmail: "Email must be a valid email address",
            loginFormRequirednumber: "Phone Number is required",
            loginFormRequiredPass: "Password is required",
            loginFormEmail: "Email address",
            loginFormNumber: "Phone Number",
            loginFormPass: "Password",
            loginFormForgetPass: "Forgot password ?",
            loginFormForgetRememberMe: "Remember me",
            loginFormLoginButton: "Login",
            heroPlay: "Play",
            category: "Category",
            deactivated: "Deactivated",
            active: "Active",
            normalUser: "Normal User",
            Admin: "Admin",
            uploadUserImage: "Upload User Image",
            UserImage: "User Image",
            remove: "Remove",
            DeleteUserDialogTitle: "Delete User",
            DeleteUserDialogMessage:
              "Are you sure you want to delete this user ? ",
            UsersPageDeleteUser: "Delete User",
            UsersPageDisableUser: "Disable User",
            DisableUserDialogMessage:
              "Are you sure you want to Disable this user ? ",
            sideBarCites: "Cites",
          },
        },
      },
      ar: {
        translation: {
          description: {
            dashboardAppWelcome: "أهلاً بك",
            sideBarDashboard: "لوحة التحكم",
            sideBarUser: "المستخدمين",
            sideBarSpecializations: "الاختصاصات",
            sideBarprivileges: "الصلاحيات",
            sideBarMedals: "الميداليات",
            sideBarCountries: "الدول",
            AccountPopoverLogout: "تسجيل الخروج",
            SearchBarSearchButton: "بحث",
            SearchBarSearchPlaceholder: "ابحث هنا ...",
            UsersPageTitle: "المستخدمين",
            UsersPageNewUser: "   إضافة مستخدم",
            NewUserDialogTitle: "إضافة  مستخدم جديد",
            NewUserDialogUsername: "اسم المستخدم",
            NewUserDialogEmail: "الايميل",
            NewUserDialogPassword: "كلمة السر",
            NewUserDialogAccountType: "نوع الحساب",
            NewUserDialogAccountTypeAdmin: "مدير",
            NewUserDialogAccountTypeAdvertiser: "معلن",
            NewUserDialogAccountTypeInfluencer: "مؤثر",
            NewUserDialogPrivileges: "الصلاحية",
            NewUserDialogSpecialization: "الاختصاص",
            NewUserDialogCountry: "المدينة",
            Cancel: "إلغاء",
            Ok: "موافق",
            UsersPageSearchPlaceholder: "ابحث عن مستخدم...",
            UsersPageTableHeadUsername: "اسم المستخدم",
            UsersPageTableHeadEmail: "البريد الألكتروني",
            UsersPageTableHeadPhoneNumber: "رقم الهاتف",
            UsersPageTableHeadRole: "صلاحية المستخدم",
            UsersPageTableHeadStatus: "حالة المستخدم",
            UsersPageTableHeadPendingBalance: "الرصيد المعلق",
            UsersPageTableHeadOverallBalance: "الرصيد الكلي",
            UsersPageTableHeadWithdrawBalance: "الرصيد المسحوب",
            UsersPageUserStatusWaitingVerification: "بانتظار التأكيد",
            UsersPageUserStatusActive: " فعال",
            UsersPageUserStatusDisabled: "معطل",
            UsersPageEditUser: "تعديل المستخدم",
            UsersPageLabelRowsPerPage: "عدد الاسطر في الصفحة",
            EditUserStatusDialogTitle: "تعديل حالة المستخدم",
            EditUserStatusDialogLabel: "الحالة",
            EditUserBalanceDialogTitle: "تعديل رصيد المستخدم",
            SpecializationsPageTitle: "الاختصاصات",
            SpecializationsPageSearchPlaceHolder: "ابحث عن اختصاص...",
            SpecializationsPageAddNew: "اضافة اختصاص جديد",
            NewSpecializationsDialogTitle: "اضافة اختصاص جديد",
            NewSpecializationsDialogArName: "الاسم العربي",
            NewSpecializationsDialogEnName: "الاسم الانكليزي",
            EditSpecializationButton: "تعديل الاختصاص",
            PrivilegepageTitle: "الصلاحيات",
            PrivilegepageNewButton: "اضافة صلاحية جديدة",
            NewPrivilegeName: "اسم الصلاحية",
            NewPrivilegeRolesTitle: "سماحيات الصلاحية",
            PrivilegepageSearchPlaceholder: "ابحث عن صلاحية...",
            PrivilegepageEditButton: "تعديل الصلاحية",
            MedalsPageTabelHeadArName: "الاسم العربي",
            MedalsPageTabelHeadEnName: "الاسم الانكليزي",
            MedalsPageTabelimage: "الصورة",
            MedalsPageTitle: "الميداليات",
            MedalsPageEditButton: "تعديل الميدالية",
            MedalsPageNewButton: "اضافة ميدالية جديدة",
            MedalsPageNewImage: "اصف صورة الميدالية",
            MedalsPageSearchPlaceholder: "ابحث عن ميدالية...",
            CountriesPageTitle: "المدن",
            CountriesPageNewButton: "اضافة مدينة جديدة",
            CountriesPageSearchPlaceholder: "ابحث عن مدينة...",
            CountriesEditPageButton: "تعديل المدينة",
            EmployeeSignIn: "تسجيل دخول الموظفين",
            heroOurServicesChip: "خدماتنا",
            heroWelcome: "أهلاً بك",
            A: " ",
            AboutUs: "من نحن",
            ourMission: "مهمتنا",
            O: " ",
            followusOnSocialMedia: "تابعنا على وسائل التواصل الإجتماعي",
            s: "",
            services: "خدماتنا",
            p: "",
            partners: "شركائنا",
            ourBlog: "المدونة",
            readMore: "قراءة المزيد",
            t: "",
            testimonials: "التوصيات",
            contactUs: "تواصلوا معنا",
            c: "",
            ContactUs: "تواصلوا معنا",
            ContactUsName: "أدخل اسمك",
            ContactUsEmail: "أدخل بريدك الإلكتروني",
            ContactUsHowCanWeHelp: "كيف يمكننا مساعدتك ؟",
            ContactUsApplyForJob: "انضم إلينا",
            ContactUsInquiry: "استعلام عن الخدمات",
            ContactUsYourMessage: "اكتب رسالتك",
            ContactUsSend: "إرسال",
            ContactUsQuestions: "يسعدنا الإجابة على استفساراتكم",
            ContactUsUploadUrCV: "ارفق سيرتك الذاتية",
            ContactUsAddress:
              "شارع الشيخ زايد، التاج الأبيض،الطابق 7، المكتب 706، 33338 دبي، الامارات العربية المتحدة",
            ContactUsAddress2:
              "شارع أمير ابن عادل عبد الملك، عمان، الأردن، مقابل مدارس اللغة الإنجليزية الحديثة، برج الجوهرة ",
            newsLetter:
              "اشترك في النشرة الإخبارية لدينا لتصلك المقالة الأسبوعية.",
            newsLetterUpdates: "* سنرسل لك التحديثات بشكل اسبوعي.",
            Subscribe: "اشترك",
            footerInfotmation: " معلومات",
            footerPrivacyPolicy: "سياسة الخصوصية",
            footerTermsOfService: "شروط الخدمة",
            loginFormValidEmail: "يجب ادخال صيغة بريد التكتروني صحيحة",
            loginFormRequirednumber: "يرجى ادخال رقم الهاتف",
            loginFormRequiredPass: "يرجى ادخال كلمة المرور",
            loginFormEmail: "البريد الالكتروني",
            loginFormNumber: "رقم الهاتف",

            loginFormPass: "كلمة المرور",
            loginFormForgetPass: "هل نسيت كلمة المرور ؟",
            loginFormForgetRememberMe: "تذكرني",
            loginFormLoginButton: "تسجيل الدخول",
            heroPlay: "تشغيل الفيديو",
            category: "التصنيفات",
            deactivated: "معطل",
            active: "فعال",
            normalUser: "مستخدم",
            Admin: "مدير نظام",
            uploadUserImage: "ارفع صورة المستخدم",
            UserImage: "صورة المستخدم",
            remove: "حذف",
            DeleteUserDialogTitle: "حذف المستخدم",
            DeleteUserDialogMessage: "هل أنت متأكد من حذف هذا المستخدم ؟ ",
            UsersPageDeleteUser: "حذف المستخدم",
            UsersPageDisableUser: "تعطيل حساب المستخدم",
            DisableUserDialogMessage:
              "هل أنت متأكد من تعطيل حساب هذا المستخدم ؟ ",
            sideBarCites: "المدن",
          },
        },
      },
    },
  });

export default i18n;
/* 
   
   {t("description.ContactUsAddress2")} 
   
   const { t } = useTranslation();
   
   
   */
