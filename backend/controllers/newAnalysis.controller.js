// const xlsx = require("xlsx");
// const coefficents = require("../config/coefficients");
// const mappingSubject = require("../config/mappingSubject");
// exports.newAnalysis = async (req, res) => {
//   try {
//     const { educationalLevel, academicYear, stream, trimester } = req.body;
//     if (!educationalLevel) {
//       return res.status(400).json({
//         error: "المستوى  الدراسي مطلوب",
//       });
//     }
//     if (!academicYear) {
//       return res.status(400).json({
//         error: "السنة الدراسية مطلوبة",
//       });
//     }
//     if (educationalLevel == "high school") {
//       if (!stream) {
//         return res.status(400).json({
//           error: "الشعبة الدراسية مطلوبة",
//         });
//       }
//     }

//     if (!trimester) {
//       return res.status(400).json({
//         error: "الفصل الدراسي مطلوب",
//       });
//     }
//     if (!req.file) {
//       return res.status(400).json({
//         error: "يرجى ادخال ملف التلاميد",
//       });
//     }

//     // console.log("actualCoefficient",actualCoefficient)
//     const workbook = xlsx.readFile(req.file.path);
//     const workSheet = workbook.Sheets[workbook.SheetNames[0]];
//     const rows = xlsx.utils.sheet_to_json(workSheet, {
//       range: 5,
//     });
//     const generalStatistics = rows[rows.length - 1];
//     // console.log(generalStatistics);
//     rows.pop();
//     rows.sort((a, b) => {
//       return b[`معدل الفصل ${trimester}`] - a[`معدل الفصل ${trimester}`];
//     });
//     const ranking = [];
//     rows.forEach((student, index) => {
//       ranking.push({
//         rank: index + 1,
//         studentName: student["اللقب و الاسم"],
//         average: student[`معدل الفصل ${trimester}`],
//       });
//     });
//     const studentsNumber = rows.length;
//     const classAverage = generalStatistics[`معدل الفصل ${trimester}`];
//     // console.log(rows[0]);
//     const temp = Object.keys(rows[0]);
//     let subjects;
//     if (trimester == "1") {
//       subjects = temp.filter(
//         (t) =>
//           t !== "الرقم" &&
//           t !== "اللقب و الاسم" &&
//           t !== "تاريخ الميلاد" &&
//           t !== "الجنس" &&
//           t !== "الإعادة",
//       );
//     } else {
//       subjects = temp.filter((t) => t.includes(`ف ${trimester}`));
//       subjects.push(`معدل الفصل ${trimester}`);
//     }

//     const statistics = [];
//     for (const subject of subjects) {
//       statistics[subject] = {
//         "0-5.99": 0,
//         "6-9.99": 0,
//         "10-11.99": 0,
//         "12-13.99": 0,
//         "14-15.99": 0,
//         "16-17.99": 0,
//         "18-20": 0,
//         maleAbove10: 0,
//         femaleAbove10: 0,
//         totalAbove10: 0,
//         maleBelow10: 0,
//         femaleBelow10: 0,
//         totalBelow10: 0,
//         doubledMaleAbove10: 0,
//         doubledFemaleAbove10: 0,
//         totalDoubledAbove10: 0,
//         doubleMaleBelow10: 0,
//         doubleFemaleBelow10: 0,
//         totalDoubledBelow10: 0,
//       };
//     }

//     const trimesterAverageLabel = `معدل الفصل ${trimester}`;

//     for (const student of rows) {
//       for (const subject of subjects) {
//         if (student[subject] >= 0 && student[subject] <= 5.99) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubleMaleBelow10++;
//               statistics[subject].totalDoubledBelow10++;
//             }
//             statistics[subject].maleBelow10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubleFemaleBelow10++;
//               statistics[subject].totalDoubledBelow10++;
//             }
//             statistics[subject].femaleBelow10++;
//           }
//           statistics[subject].totalBelow10++;
//           statistics[subject]["0-5.99"]++;
//         } else if (student[subject] <= 9.99) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubleMaleBelow10++;
//               statistics[subject].totalDoubledBelow10++;
//             }
//             statistics[subject].maleBelow10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].totalDoubledBelow10++;
//               statistics[subject].doubleFemaleBelow10++;
//             }
//             statistics[subject].femaleBelow10++;
//           }
//           statistics[subject].totalBelow10++;
//           statistics[subject]["6-9.99"]++;
//         } else if (student[subject] <= 11.99) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledMaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].maleAbove10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledFemaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].femaleAbove10++;
//           }
//           statistics[subject].totalAbove10++;
//           statistics[subject]["10-11.99"]++;
//         } else if (student[subject] <= 13.99) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledMaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].maleAbove10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledFemaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].femaleAbove10++;
//           }

//           statistics[subject].totalAbove10++;
//           statistics[subject]["12-13.99"]++;
//         } else if (student[subject] <= 15.99) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledMaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].maleAbove10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledFemaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].femaleAbove10++;
//           }

//           statistics[subject].totalAbove10++;
//           statistics[subject]["14-15.99"]++;
//         } else if (student[subject] <= 17.99) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledMaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].maleAbove10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledFemaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].femaleAbove10++;
//           }

//           statistics[subject].totalAbove10++;
//           statistics[subject]["16-17.99"]++;
//         } else if (student[subject] <= 20) {
//           if (student["الجنس"] == "ذكر") {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledMaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].maleAbove10++;
//           } else {
//             if (student["الإعادة"] == "نعم") {
//               statistics[subject].doubledFemaleAbove10++;
//               statistics[subject].totalDoubledAbove10++;
//             }
//             statistics[subject].femaleAbove10++;
//           }

//           statistics[subject].totalAbove10++;
//           statistics[subject]["18-20"]++;
//         }
//       }
//     }
//     for (const subject of subjects) {
//       statistics[subject].subjectAverage = generalStatistics[subject];
//       statistics[subject].successRate =
//         (statistics[subject].totalAbove10 * 100) / studentsNumber;
//     }

//     let bestSubjct = {
//       bestSubjectName: "",
//       bestSubjectAverage: -1,
//     };
//     let worstSubject = {
//       worstSubjectName: "",
//       worstSubjectAverage: 21,
//     };
//     for (const subject of subjects) {
//       if (subject == trimesterAverageLabel) continue;
//       if (generalStatistics[subject] > bestSubjct.bestSubjectAverage) {
//         bestSubjct.bestSubjectAverage = generalStatistics[subject];
//         bestSubjct.bestSubjectName = subject;
//       }
//       if (generalStatistics[subject] < worstSubject.worstSubjectAverage) {
//         worstSubject.worstSubjectAverage = generalStatistics[subject];
//         worstSubject.worstSubjectName = subject;
//       }
//     }
//     // console.log(ranking);
//     // console.log("studentsNumber", studentsNumber);
//     // console.log("classAverage", classAverage);
//     // console.log("statistics", statistics);
//     // console.log("bestSubjct", bestSubjct);
//     // console.log("worstSubject", worstSubject);
//     console.log(generalStatistics);
//     // !this is the statistics of the corespending semester
//     if (trimester == "2") {
//       // const subject1 = subjects.map((subject) => subject.replace("2", "1"));
//       const averageT1 = generalStatistics["معدل الفصل 1"];
//       let studentsabove10T1 = 0;
//       let studentsbelow10T1 = 0;
//       for (const student of rows) {
//         if (student["معدل الفصل 1"] >= 10) studentsabove10T1++;
//         else {
//           studentsbelow10T1++;
//         }
//       }
//       const successRateT1 = (studentsabove10T1 * 100) / studentsNumber;
//       console.log("averageT1", averageT1);
//       console.log("studentsabove10T1", studentsabove10T1);
//       console.log("studentsbelow10T1", studentsbelow10T1);
//       console.log("successRateT1", successRateT1);
//     }
//     if (trimester == "3") {
//       // const subject1 = subjects.map((subject) => subject.replace("2", "1"));
//       const averageT1 = generalStatistics["معدل الفصل 1"];
//       let studentsabove10T1 = 0;
//       let studentsbelow10T1 = 0;
//       for (const student of rows) {
//         if (student["معدل الفصل 1"] >= 10) studentsabove10T1++;
//         else {
//           studentsbelow10T1++;
//         }
//       }
//       const successRateT1 = (studentsabove10T1 * 100) / studentsNumber;
//       const averageT2 = generalStatistics["معدل الفصل 2"];
//       let studentsabove10T2 = 0;
//       let studentsbelow10T2 = 0;
//       for (const student of rows) {
//         if (student["معدل الفصل 2"] >= 10) studentsabove10T2++;
//         else {
//           studentsbelow10T2++;
//         }
//       }
//       const successRateT2 = (studentsabove10T2 * 100) / studentsNumber;
//       console.log("averageT1", averageT1);
//       console.log("studentsabove10T1", studentsabove10T1);
//       console.log("studentsbelow10T1", studentsbelow10T1);
//       console.log("successRateT1", successRateT1);
//       console.log("averageT2", averageT2);
//       console.log("studentsabove10T2", studentsabove10T2);
//       console.log("studentsbelow10T12", studentsbelow10T2);
//       console.log("successRateT2", successRateT2);
//     }
//   } catch (error) {
//     return res.status(500).json({
//       error: "حدث خطاء في التحليل حاول مجددا ",
//     });
//   }
// };
const xlsx = require("xlsx");
const coefficents = require("../config/coefficients");
const mappingSubject = require("../config/mappingSubject");
const Analyses = require("../models/Analyses");

exports.newAnalysis = async (req, res) => {
  try {
    // =========================================================
    // 1. VALIDATION
    // =========================================================

    const { educationalLevel, academicYear, stream, trimester, name } =
      req.body;
    // console.log("stream:",stream);
    if (!educationalLevel) {
      return res.status(400).json({
        error: "المستوى الدراسي مطلوب",
      });
    }

    if (!academicYear) {
      return res.status(400).json({
        error: "السنة الدراسية مطلوبة",
      });
    }

    if (educationalLevel === "high school" && !stream) {
      return res.status(400).json({
        error: "الشعبة الدراسية مطلوبة",
      });
    }

    if (!trimester) {
      return res.status(400).json({
        error: "الفصل الدراسي مطلوب",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "يرجى إدخال ملف التلاميذ",
      });
    }

    const trimesterNumber = Number(trimester);

    // =========================================================
    // 2. READ EXCEL FILE
    // =========================================================

    const workbook = xlsx.readFile(req.file.path);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = xlsx.utils.sheet_to_json(worksheet, {
      range: 5,
    });

    if (rows.length < 2) {
      return res.status(400).json({
        error: "الملف لا يحتوي على بيانات كافية",
      });
    }

    // Last row contains general statistics
    const generalStatistics = rows[rows.length - 1];

    // Remove general statistics row
    rows.pop();

    const studentsNumber = rows.length;

    if (studentsNumber === 0) {
      return res.status(400).json({
        error: "لا يوجد تلاميذ في الملف",
      });
    }

    // =========================================================
    // 3. CURRENT TRIMESTER INFORMATION
    // =========================================================

    const trimesterAverageLabel = `معدل الفصل ${trimesterNumber}`;

    const classAverage = Number(generalStatistics[trimesterAverageLabel]);

    // =========================================================
    // 4. RANKING
    // =========================================================

    const rankedStudents = [...rows].sort((a, b) => {
      return (
        Number(b[trimesterAverageLabel]) - Number(a[trimesterAverageLabel])
      );
    });

    const ranking = rankedStudents.map((student, index) => ({
      rank: index + 1,
      studentName: student["اللقب و الاسم"],
      average: Number(student[trimesterAverageLabel]),
    }));

    // =========================================================
    // 5. CLASS SUCCESS / FAILURE
    // =========================================================

    let successCount = 0;
    let failureCount = 0;

    for (const student of rows) {
      const average = Number(student[trimesterAverageLabel]);

      if (!Number.isFinite(average)) continue;

      if (average >= 10) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    const successRate =
      studentsNumber > 0 ? (successCount * 100) / studentsNumber : 0;

    const failureRate =
      studentsNumber > 0 ? (failureCount * 100) / studentsNumber : 0;

    // =========================================================
    // 6. STUDENT DISTRIBUTION
    // =========================================================

    const distribution = {
      "0-5.99": 0,
      "6-9.99": 0,
      "10-11.99": 0,
      "12-13.99": 0,
      "14-15.99": 0,
      "16-17.99": 0,
      "18-20": 0,
    };

    for (const student of rows) {
      const average = Number(student[trimesterAverageLabel]);

      if (!Number.isFinite(average)) continue;

      if (average >= 0 && average <= 5.99) {
        distribution["0-5.99"]++;
      } else if (average <= 9.99) {
        distribution["6-9.99"]++;
      } else if (average <= 11.99) {
        distribution["10-11.99"]++;
      } else if (average <= 13.99) {
        distribution["12-13.99"]++;
      } else if (average <= 15.99) {
        distribution["14-15.99"]++;
      } else if (average <= 17.99) {
        distribution["16-17.99"]++;
      } else if (average <= 20) {
        distribution["18-20"]++;
      }
    }

    // =========================================================
    // 7. BEST / WORST STUDENT
    // =========================================================

    const bestStudent = ranking.length > 0 ? ranking[0] : null;

    const worstStudent =
      ranking.length > 0 ? ranking[ranking.length - 1] : null;

    // =========================================================
    // 8. FIND SUBJECTS
    // =========================================================

    const columns = Object.keys(rows[0]);

    let subjects = [];

    if (trimesterNumber === 1) {
      subjects = columns.filter((column) => {
        return (
          column !== "الرقم" &&
          column !== "اللقب و الاسم" &&
          column !== "تاريخ الميلاد" &&
          column !== "الجنس" &&
          column !== "الإعادة"
          // column !== trimesterAverageLabel
        );
      });
    } else {
      subjects = columns.filter((column) =>
        column.includes(`ف ${trimesterNumber}`),
      );
    }

    // =========================================================
    // 9. SUBJECT STATISTICS
    // =========================================================

    const statistics = {};

    for (const subject of subjects) {
      statistics[subject] = {
        average: Number(generalStatistics[subject]) || 0,

        distribution: {
          "0-5.99": 0,
          "6-9.99": 0,
          "10-11.99": 0,
          "12-13.99": 0,
          "14-15.99": 0,
          "16-17.99": 0,
          "18-20": 0,
        },

        maleAbove10: 0,
        femaleAbove10: 0,
        totalAbove10: 0,

        maleBelow10: 0,
        femaleBelow10: 0,
        totalBelow10: 0,

        doubledMaleAbove10: 0,
        doubledFemaleAbove10: 0,
        totalDoubledAbove10: 0,

        doubledMaleBelow10: 0,
        doubledFemaleBelow10: 0,
        totalDoubledBelow10: 0,

        successRate: 0,
        failureRate: 0,
      };
    }

    // =========================================================
    // 10. CALCULATE SUBJECT STATISTICS
    // =========================================================

    for (const student of rows) {
      for (const subject of subjects) {
        const mark = Number(student[subject]);

        // Ignore empty / invalid marks
        if (!Number.isFinite(mark)) {
          continue;
        }

        const stats = statistics[subject];

        // -----------------------------------------
        // Grade distribution
        // -----------------------------------------

        if (mark >= 0 && mark <= 5.99) {
          stats.distribution["0-5.99"]++;
        } else if (mark <= 9.99) {
          stats.distribution["6-9.99"]++;
        } else if (mark <= 11.99) {
          stats.distribution["10-11.99"]++;
        } else if (mark <= 13.99) {
          stats.distribution["12-13.99"]++;
        } else if (mark <= 15.99) {
          stats.distribution["14-15.99"]++;
        } else if (mark <= 17.99) {
          stats.distribution["16-17.99"]++;
        } else if (mark <= 20) {
          stats.distribution["18-20"]++;
        }

        // -----------------------------------------
        // Success / failure
        // -----------------------------------------

        const isMale = student["الجنس"] === "ذكر";
        const isFemale = student["الجنس"] === "أنثى";
        const isRepeater = student["الإعادة"] === "نعم";

        if (mark >= 10) {
          stats.totalAbove10++;

          if (isMale) {
            stats.maleAbove10++;

            if (isRepeater) {
              stats.doubledMaleAbove10++;
              stats.totalDoubledAbove10++;
            }
          }

          if (isFemale) {
            stats.femaleAbove10++;

            if (isRepeater) {
              stats.doubledFemaleAbove10++;
              stats.totalDoubledAbove10++;
            }
          }
        } else {
          stats.totalBelow10++;

          if (isMale) {
            stats.maleBelow10++;

            if (isRepeater) {
              stats.doubledMaleBelow10++;
              stats.totalDoubledBelow10++;
            }
          }

          if (isFemale) {
            stats.femaleBelow10++;

            if (isRepeater) {
              stats.doubledFemaleBelow10++;
              stats.totalDoubledBelow10++;
            }
          }
        }
      }
    }

    // =========================================================
    // 11. SUBJECT SUCCESS / FAILURE RATES
    // =========================================================

    for (const subject of subjects) {
      const stats = statistics[subject];

      stats.successRate =
        studentsNumber > 0 ? (stats.totalAbove10 * 100) / studentsNumber : 0;

      stats.failureRate =
        studentsNumber > 0 ? (stats.totalBelow10 * 100) / studentsNumber : 0;
    }

    // =========================================================
    // 12. BEST / WORST SUBJECT
    // =========================================================

    let bestSubject = null;
    let worstSubject = null;

    for (const subject of subjects) {
      const average = Number(generalStatistics[subject]);

      if (!Number.isFinite(average)) continue;

      if (!bestSubject || average > bestSubject.average) {
        bestSubject = {
          name: subject,
          average,
        };
      }

      if (!worstSubject || average < worstSubject.average) {
        worstSubject = {
          name: subject,
          average,
        };
      }
    }

    // =========================================================
    // 13. TRIMESTER COMPARISON
    // =========================================================

    const calculateTrimesterStats = (trimesterNumber) => {
      const label = `معدل الفصل ${trimesterNumber}`;

      const average = Number(generalStatistics[label]);

      let success = 0;
      let failure = 0;

      for (const student of rows) {
        const studentAverage = Number(student[label]);

        if (!Number.isFinite(studentAverage)) {
          continue;
        }

        if (studentAverage >= 10) {
          success++;
        } else {
          failure++;
        }
      }

      return {
        average,

        successCount: success,
        failureCount: failure,

        successRate: studentsNumber > 0 ? (success * 100) / studentsNumber : 0,

        failureRate: studentsNumber > 0 ? (failure * 100) / studentsNumber : 0,
      };
    };
    const getSubjects = (generalStatistics, trimesterNumber) => {
      return Object.fromEntries(
        Object.entries(generalStatistics).filter(([key]) =>
          key.includes(`ف ${trimesterNumber}`),
        ),
      );
    };

    let comparison = null;

    if (trimesterNumber >= 2) {
      comparison = {};

      for (let i = 1; i <= trimesterNumber; i++) {
        comparison[`trimester${i}`] = calculateTrimesterStats(i);
        comparison[`trimester${i}`].subjects = getSubjects(
          generalStatistics,
          i,
        );
      }
    }

    // =========================================================
    // 14. FINAL RESULT OBJECT
    // =========================================================

    const result = {
      overview: {
        studentsNumber,
        classAverage,

        success: {
          count: successCount,
          rate: successRate,
        },

        failure: {
          count: failureCount,
          rate: failureRate,
        },
      },

      students: {
        best: bestStudent,
        worst: worstStudent,
        ranking,
      },

      subjects,
      statistics,
      distribution,
      bestSubject,

      worstSubject,

      comparison,
    };
    // console.log(result.comparison.trimester2.subjects);
    // console.log(generalStatistics);
    // =========================================================
    // 15. SAVE ANALYSIS
    // =========================================================

    const analysis = await Analyses.create({
      user: req.user._id,

      name: Buffer.from(req.file.originalname, "latin1").toString("utf8").replace(`.xls`,""),

      educationalLevel,

      schoolYear: academicYear,

      stream: educationalLevel === "high school" ? stream : null,

      trimester: trimesterNumber,

      file: {
        originalName: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
      },

      result,
    });

    // =========================================================
    // 16. RESPONSE
    // =========================================================

    return res.status(201).json({
      message: "تم تحليل الملف وحفظ النتائج بنجاح",

      analysisId: analysis._id,

      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "حدث خطأ في التحليل، حاول مجدداً",
    });
  }
};
