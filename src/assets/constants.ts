export class Constants {
    /** Db constants */
    public static DB_ORIGIN_DATA_MIGRATION = 'data_migration';
    public static DB_ORIGIN_IWBMS = 'iwbms';
    public static DB_ORIGIN_LEGACY_DATA_ENTRY = 'legacy_data_entry';
    public static TEMP_REG_NO_INITIALS = 'TR';
  
    /** Database */
    public static ERROR_CONNECTOR_NOT_CONFIGURED = 'The database connector is not configured. Use Database.Instance.configure() method to configure connector.';
    public static ERROR_CONNECTOR_ALREADY_CONFIGURED = 'The database connector is already configured. Please use Database.Instance.Reconfigure()';
  
    /* Logger constants */
    public static ERROR_LOGGER_CONFIGURE_FAILED = 'Failed to configure provided logger. The logger does not support {level} level';
    public static SUCCESS_BOCW_WORKER_REGISTRATION = 'The registration of {user} is successfully done.';
    public static BULK_APPROVAL_SUCCESS = 'Bulk applications approval request completed successfully.'
  
    /* General constants */
    public static UPDATE_ITERATION = 'Iteration Updated Successfully';
    public static FILE_NOT_FOUND = '{file} not found.';
    public static UPDATE_BOCW_WORKER_REGISTRATION = 'The updation for registration of {user} is successfully done.';
    public static SUCCESS_GET_BOCW_WORKER_REGISTRATION = 'Successfully registered.';
    public static SUCCESS_CARD_PRINT = 'Card printed successfully.';
    public static SUCCESS_CASH_RECEIPT_DETAILS = 'Get cash receipt request completed successfully.';
    public static UPDATE_DOCUMENT_VERIFICATION_STATUS = 'Document updated successfully.';
    public static VERIFY_AADHAR_NO = 'AADHAR number verified successfully.';
  
    /*MASTER CONTROL*/
    public static GET_STATES = 'states get successfully.';
    public static GET_DISTRICTS = 'Get districts request completed successfully.';
    public static GET_DISTRICTS_BOCW_CODES = 'Get district with BOCW codes request completed successfully.';
    public static GET_TALUKAS = 'Get Talukas request completed successfully.';
    public static GET_WFCS = 'Get WFCS request completed successfully.';
    public static GET_USER_BY_WFC = 'Get User by WFC request completed successfully.';
    public static GET_POST_OFFICE = 'Get postoffice request completed successfully.';
    public static GET_CATEGORIES = 'Get categories request completed successfully. ';
    public static GET_EDUCATION = 'Get education request completed successfully.';
    public static GET_MARITAL_STATUS = 'Get maritial status updated successfully.';
    public static GET_ISSUERS = 'Get issuers request completed successfully.';
    public static GET_ISSUER_REGISTRATION_TYPES = 'Get issuer registration type request completed successfully.';
    public static GET_DOCUMENT_TYPES = 'Get document types request completed successfully.';
    public static GET_FAMILY_RELATIONS = 'Get family relations request completed successfully.';
    public static GET_RATION_CARD_TYPES = 'Get request for ration card types completed successfully.';
    public static GET_TYPES_OF_WORKERS = 'Get types of workers request completed successfully.';
    public static GET_GENDERS = 'Get genders request completed successfully.';
    public static GET_SCHEME_CATEGORIES = 'Get scheme categories request completed successfully.';
  
    /*OTP CONTROLLER*/
    public static GENERATE_OTP = 'OTP generated successfully.';
    public static VERIFY_OTP = 'OTP verified successfully.';
    public static GET_USER_TYPES = 'User types verified successfully.';
  
    /*TOKEN MANAGEMENT CONTROLLER*/
    public static CHECK_FOR_ACKNOWLEDGEMENT_NO = 'Checked acknowledgement number successfully.';
    public static CHECK_FOR_Mobile_NO = 'Checked mobile number successfully.';
    public static PAYMENT_RESPONSE = 'Payment response generated successfully.';
    public static UPDATE_DEO_TOKEN_AUDIT = 'DEO token audit request completed successfully.';
    public static UPDATE_CLERK_TOKEN_AUDIT = 'Clerk token audit request completed successfully.';
    public static CANCELED_BY_DEO = 'Token canceled by Deo.';
    public static UPDATE_TOKEN_BY_REGISTRATION_OFFICER = 'Updated token by registration officer successfully.';
    public static GET_TOKENS = 'Get tokens request completed successfully.';
    public static CHECK_FOR_RENEWAL = 'Checked for renewal request completed successfully.';
    public static CHECK_FOR_ONLINE_RENEWAL = 'Online renewal request completed successfully.';
    public static USER_NOT_FOUND = 'No user found for given registration number and mobile no.';
    public static DUPLICATE_MOBILE_NUMBER = 'This mobile number is already registered with another user.';
    public static USER_ALREADY_EXIST = 'User already registerd.';
  
    /*USER CONTROLLER*/
    public static GET_SYSTEM_USERS = 'Get system users request completed successfully.';
    public static GET_UPDATE_SYSTEM_USERS_ACTIVITY_STATUS = 'Users activity status updated successfully.';
    public static UPDATE_REGISTRATION_NO = 'Registration number updated successfully.';
    public static REGISTRATION_NOT_FOUND = 'Registration not found with bocw id of {id}';
  
    public static RENEWAL_DATA_NOT_FOUND_FROM_TOKEN = 'Renewal data not found for token {id}';
    public static GET_CASH_RECEIPT = 'Get cash receipt request completed successfully.';
  
    /*CLAIM-MANAGEMENT CONTROLLER*/
    public static GET_SCHEME_DETAILS = 'Scheme Details returned successfully.';
    public static GET_SCHEME_CATEGORY = 'Scheme Categories returned successfully.';
    public static APPLICATION_STATUS_APPROVED = 'accept';
    public static APPLICATION_STATUS_REJECTED = 'reject';
    public static APPLY_FOR_CLAIM_SUCCESS = 'Apply for claim request completed successfully.';
    public static CLAIM_APPROVAL_SUCCESS = 'Claim approval request completed successfully.';
    public static CLAIM_DOCUMENT_VERIFICATION_SUCCESS = 'Claim document verificaton request completed successfully.';
    public static GET_PREVIOUS_CLAIMS = 'Previous claim details for requested scheme number returned successfully .';
  
    /*SCHEME-MANAGEMENT CONTROLLER*/
    public static UPDATE_SCHEME_SUCCESS = 'Edit Scheme detail request completed successfully.';
  
    /* Registrations Consts */
    public static SUCCESS_ADD_CLAIM_DATA = 'Successfuly added claim data for BOCW ID {bocwId}.'
    public static SUCCESS_ADD_CASH_RECEIPT_DATA = 'Successfuly added cash receipt data for BOCW ID {bocwId}.'
    public static SUCCESS_ADD_RENEWAL_DATA = 'Successfuly added renewal data for BOCW ID {bocwId}.'
    public static SUCCESS_UPDATE_REGISTRATION_NO = 'Successfuly updated registration No. for BOCW ID {bocwId}.'
    public static OBJECTED_BY_EMP = "Employer objected the certificate of worker {RegistrationNo}"
  
    /* Error Messages For backend validators */
    public static ONCE_FOR_EACH_STANDARD = 'You can not apply more than one time for each standard for the same child.';
    public static FOR_EACH_STANDARD = 'You can not apply for the same standard.';
    public static ONLY_FOR_FIRST_TWO_CHILDREN = 'Cannot apply for more than two children.';
    public static ONLY_FOR_FIRST_TWO_CHILDREN_OR_WIFE = 'Can apply for either children or wife only.';
    public static GAP_MONTH_1 = 'You can apply for this claim after 1 months of the last Claim.';
    public static GAP_MONTH_12 = 'You can apply for this claim after 12 months of the last Claim.';
    public static GAP_MONTH_36 = 'You can apply for this claim after 36 months of the last Claim.';
    public static ONCE_FOR_ONE_OF_THE_SPOUSE = 'Your partner already applied for this scheme.';
    public static ONCE_FOR_ONE_OF_THE_CHILD = 'Claim already applied for this child';
    public static AADHAR_CARD_CHECK = 'Your aadhar card doesn\'t match.';
    public static NOT_APPLICABLE = 'You are not applicable for this scheme.';
    public static ALREADY_APPLIED_BY_SPOUSE = 'This scheme is already been applied by your spouse.';
    public static WIFE_OR_CHILD_CHECK = 'You cannot claim for another person.';
    public static STANDARD_CHECK = 'Cannot claim for this standard.';
    public static ACADEMIC_YEAR_CHECK = 'You cannot claim for this year.';
    public static APPLY_ONLY_ONCE = 'You can not apply more than one time.'
    public static ONLY_FOR_FIRST_TO_TENTH = 'You cannot apply more than one time.'
    public static ONLY_FOR_TENTH_OR_TWELVETH = 'You can not apply more than one time.'
    public static ONLY_FOR_ELEVENTH_OR_TWELVETH = 'You can not apply more than one time.'
    public static ONLY_FOR_DEGREE_CLAIM = 'You can not apply more than one time.'
    public static ONLY_FOR_DIPLOMA_OR_POSTGRADUATION = 'You can not apply more than one time.'
    public static ONLY_FOR_ONE_DEGREE = 'You can not apply for another degree.'
    public static ONCE_FOR_LIFETIME = "You have  already applied for this scheme."
    public static APPLY_AFTER_REGISTRATION = 'You are not applicable.\n Disability date should be after registration.'
    public static CLAIMED_FULL_AMOUNT = 'You have already exceeded the claim amount from this scheme.'
    public static RATION_CARD = 'This scheme is available only for Non-ration card holders'
    // public static AGE_CRITERIA = 'This scheme is available only for the age group from 51 to 60'
    // public static AGE_CRITERIA_FOR_LOAN = 'This scheme is available only for the age group from 18 to 50'
  
  
  
  
  
  
    /* WFC ID does not match for online registration token */
    public static WRONG_WFC = 'Application not allowed to be processed at current WFC';
  
    /* Self Declarations */
    public static SELF_DECLARATION_registration = 'I hereby declare that the information / documents provided in above form is true & correct to the best of my knowledge and belief and nothing has been falsely stated. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.';
    public static SELF_DECLARATION_registration_mr = 'मी याद्वारे असे जाहीर करतो / करते की, वरील सर्व माहिती माझी व्यक्तिगत माहिती व समजूतीनुसार खरी आहे.  दिलेली माहिती खोटी असल्याचे आढळून आल्यास, भारतीय दंड किंवा संबंधित कायद्यानुसार माझ्यावर खटला भरला जाईल व त्यानुसार मी शिक्षेस पात्र राहीन याची मला पूर्ण जाणीव आहे.';
  
    /**/
  
  
    public static SCHEMES_ELIGIBILITY_OBJECT = {
      E01: false,
      E02: false,
      E03: false,
      E04: false,
      E05: false,
      E06: false,
      E07: false,
      S01: false,
      S02: false,
      S03: false,
      S04: false,
      S05: false,
      S06: false,
      S07: false,
      S08: false,
      S09: false,
      H01: false,
      H02: false,
      H03: false,
      H04: false,
      H05: false,
      H06: false,
      F01: false,
      F02: false,
      F03: false,
      F04: false,
      F05: false,
      F06: false
    };
  
    public static DELIVERY_TYPE = [
      { type: 'Normal Delivery / नैसर्गिक प्रसूती', id: 0 },
      { type: 'Caesarean Delivery /  शस्त्रक्रियाद्वारे प्रसूती', id: 1 }
    ];
  
    public static RATION_TYPE = [
      { type: 'Orange Card / केशरी कार्ड', id: "1" },
      { type: 'Yellow Card / पिवळे कार्ड ', id: "7" },
    ];
  
    public static TYPE_OF_ILLNESS = [
      { type: 'Heart surgery/ हृदय शस्त्रक्रिया', id: "1" },
      { type: 'Bypass surgery / बायपास शस्त्रक्रिया ', id: "2" },
      { type: 'Angioplasty surgery / अँजिओप्लास्टी शस्त्रक्रिया ', id: "3" },
      { type: 'Kidney transplantation / मूत्रपिंड प्रत्यारोपण ', id: "4" },
      { type: 'All types of Cancer /सर्व प्रकारचे कर्करोग ', id: "5" },
    ];
  
    public static TYPE_OF_ISSUER = [
      { type: 'Mahaanagar Paalika / महानगरपालिका', id: "1" },
      { type: 'Gram Panchayat / ग्रामपंचायत', id: "2" },
      { type: 'Tehsil / तहसील', id: "3" },
      { type: 'Nagar Paalika / नगरपालिक ', id: "4" },
    ];
  
    public static ACADEMIC_YEAR = [
      { type: 'First Year / प्रथम वर्ष', id: "1" },
      { type: 'Second Year / द्वितीय वर्ष', id: "2" },
      { type: 'Third Year / तृतीय वर्ष', id: "3" },
      { type: 'Fourth Year / चतुर्थ वर्ष', id: "4" },
    ];
  
  
    public static DEGREES = [
  
      // engineering degrees
      { type: 'engineering', name: 'Computer Science', id: "1" },
      { type: 'engineering', name: 'Environmental Engineering', id: "2" },
      { type: 'engineering', name: 'Electronics and Telecommunication Engineering', id: "3" },
      { type: 'engineering', name: 'Aerospace Engineering', id: "4" },
      { type: 'engineering', name: 'Civil Engineering', id: "5" },
      { type: 'engineering', name: 'Mechanical Engineering', id: "6" },
      { type: 'engineering', name: 'Information Technology Engineering', id: "7" },
      { type: 'engineering', name: 'Marine Engineering', id: "8" },
      { type: 'engineering', name: 'Chemical Engineering', id: "9" },
      { type: 'engineering', name: 'Biotechnology Engineering', id: "10" },
      { type: 'engineering', name: 'Agriculture and Food Engineering', id: "11" },
      { type: 'engineering', name: 'Automobile Engineering', id: "12" },
      { type: 'engineering', name: 'Metallurgical Engineering', id: "13" },
      { type: 'engineering', name: 'Textile Engineering', id: "14" },
      { type: 'engineering', name: 'Industrial Engineering', id: "15" },
      { type: 'engineering', name: 'Naval Architecture and Ocean Engineering', id: "16" },
      { type: 'engineering', name: 'Petroleum Engineering', id: "17" },
      { type: 'engineering', name: 'Instrumentation Engineering', id: "18" },
      { type: 'engineering', name: 'Industrial and Production Engineering', id: "19" },
      { type: 'engineering', name: 'Ceramic Engineering', id: "20" },
      { type: 'engineering', name: 'Engineering Physics', id: "21" },
  
  
      // medical degrees
      { type: 'medical', name: 'Bachelor of Medicine, Bachelor of Surgery - MBBS', id: "22" },
      { type: 'medical', name: 'Bachelor of Dental Surgery - BDS', id: "23" },
      { type: 'medical', name: 'Bachelor of Ayurvedic Medicine and Surgery - BAMS', id: "24" },
      { type: 'medical', name: 'Bachelor of Homeopathic Medicine and Surgery - BHMS', id: "25" },
      { type: 'medical', name: 'Bachelor of Unani Medicine and Surgery - BUMS', id: "26" },
      { type: 'medical', name: 'Bachelor of Physiotherapy - B.Pth or BPT', id: "27" },
      { type: 'medical', name: 'Bachelor of Veterinary Science - B.VSc', id: "28" },
      { type: 'medical', name: 'Bachelor of Naturopathy and Yoga - BNYS', id: "29" },
      { type: 'medical', name: 'Bachelor of Siddha Medicine and Surgery - BSMS', id: "30" },
      { type: 'medical', name: 'Bachelor of Occupational Therapy', id: "31" },
      { type: 'medical', name: 'Bachelor of Science in Biotechnology', id: "32" },
      { type: 'medical', name: 'Bachelor of Technology (B.Tech) in Biomedical Engineering', id: "33" },
      { type: 'medical', name: 'Bachelor of Science in Microbiology (Non-Clinical)', id: "34" },
      { type: 'medical', name: 'Bachelor of Science in Cardiac or Cardiovascular Technology', id: "35" },
      { type: 'medical', name: 'Bachelor of Respiratory Therapy', id: "36" },
      { type: 'medical', name: 'Bachelor in Psychology', id: "37" },
  
  
    ];
  
    public static ISSUING_AUTHORITY = [
      { type: 'Gramsevak / ग्रामसेवक', id: "1" },
      { type: 'Municipal Council / नगरपरिषद', id: "2" },
      { type: 'Municipal Corporation / महानगरपालिका', id: "3" },
      { type: 'Any Other Competent Authority / कोणतीही इतर सक्षम प्राधिकरण ', id: "4" },
    ]
  
  
    public static claimRegion = [
      { type: 'Urban / शहरी', id: "1" },
      { type: 'Rural/ ग्रामीण', id: "2" },
    ]
  
  }
  