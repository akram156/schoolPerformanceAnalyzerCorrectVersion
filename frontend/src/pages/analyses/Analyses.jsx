import axios from "axios";
import React, { useEffect, useRef } from "react";
// !!!!!!!!!!!!
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// !!!!!!!!!!!!
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import "./Analyses.css";
import translations from "../../translator";
const Analyses = ({ language }) => {
  const { id } = useParams();
  const [analyse, setAnalyse] = useState(null);
  const getAnalyse = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `http://localhost:9825/api/analysis/${id}`,
        {
          headers: {
            authorization: token,
          },
        },
      );
      setAnalyse(result.data.analyse);
    } catch (error) {
      console.log(error.response);
    }
  };
  const t = translations[language];
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log("analyse", analyse);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const distribution = analyse?.result?.distribution || {};

  const distributionValues = Object.values(distribution);

  const maxValue = Math.max(...distributionValues, 0);

  const step = Math.round(maxValue / 8);
  console.log(step);
  const yAxisValues = Array.from({ length: 9 }, (_, index) => {
    const value = maxValue - step * index;

    return value < 0 ? null : Math.round(value);
  }).filter((value) => value !== null);
  console.log("yAxisValues:", yAxisValues);
  const formatNumber = (value) => {
    if (Number.isInteger(value)) {
      return value;
    }

    return Number(value.toFixed(2));
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const analysisRef = useRef(null);
  const downloadPDF = async () => {
    const element = analysisRef.current;

    if (!element) {
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",

        scrollX: 0,
        scrollY: 0,

        // Modify only the cloned document used by html2canvas
        onclone: (clonedDocument) => {
          const clonedPage = clonedDocument.querySelector(".analysis-page");

          if (!clonedPage) {
            return;
          }

          // Expand all elements that are scrollable vertically or horizontally
          const scrollableElements =
            clonedPage.querySelectorAll(".pdf-scroll-table");

          scrollableElements.forEach((scrollElement) => {
            scrollElement.style.height = "auto";
            scrollElement.style.maxHeight = "none";
            scrollElement.style.overflow = "visible";
            scrollElement.style.overflowY = "visible";
            scrollElement.style.overflowX = "visible";
          });

          // Also expand the actual table wrappers
          const tableWrappers = clonedPage.querySelectorAll(
            ".pdf-table-container",
          );

          tableWrappers.forEach((wrapper) => {
            wrapper.style.height = "auto";
            wrapper.style.maxHeight = "none";
            wrapper.style.overflow = "visible";
            wrapper.style.overflowY = "visible";
            wrapper.style.overflowX = "visible";
          });
        },
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imageWidth = pdfWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);

      heightLeft -= pdfHeight;

      // Add additional pages when the content is taller than one A4 page
      while (heightLeft > 0) {
        position = heightLeft - imageHeight;

        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);

        heightLeft -= pdfHeight;
      }

      pdf.save(`analysis-${id}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    getAnalyse();
  }, []);
  if (!analyse) {
    return <Loading />;
  }
  // !==================================================================
  return (
    <div className="analysis-page" ref={analysisRef}>
      {/* ======================================================
          TOP HEADER
      ====================================================== */}

      <div className="analysis-header">
        <div className="analysis-title">
          <button className="back-button">{language=="العربية"?'→':'←'}</button>

          <div>
            <h1> {t.analysisDetails}</h1>
            <span>{t.comprehensiveAcademicPerformanceAnalysis}</span>
          </div>
        </div>
        <div className="analysis-title"></div>
        <div className="export-buttons">
          <button className="export-pdf" onClick={downloadPDF}>↓ {t.télécharger} PDF</button>
        </div>
      </div>

      {/* ======================================================
          FIRST ROW - ANALYSIS INFORMATION
      ====================================================== */}

      <section className="information-card">
        <InfoItem
          
          title={t.educationalLevel}
          value={t[analyse.educationalLevel]}
        />

        <InfoItem
          
          title={t.academicYearStep}
          value={analyse.schoolYear}
        />

        {analyse.stream && (
          <InfoItem  title={t.stream} value={t[analyse.stream]} />
        )}

        <InfoItem  title={t.trimester} value={analyse.trimester} />
      </section>

      {/* ======================================================
          SECOND ROW - KPI CARDS
      ====================================================== */}

      <section className="kpi-grid">
        <KpiCard
          icon="♟"
          title={t.totalStudents}
          value={analyse.result.overview.studentsNumber}
          type="blue"
        />

        <KpiCard
          icon="▥"
          title={t.trimesterAverage}
          value={`${analyse.result.overview.classAverage} / 20`}
          type="green"
        />

        <KpiCard
          icon="✓"
          title={t.successRate}
          value={`${analyse.result.overview.success.rate.toFixed(2)}%`}
          type="success"
        />

        <KpiCard
          icon="×"
          title={t.failureRate}
          value={`${analyse.result.overview.failure.rate.toFixed(2)}%`}
          type="danger"
        />

        <KpiCard
          icon="🏆"
          title={t.bestStudent}
          value={analyse.result.students.best.studentName}
          subValue={`${analyse.result.students.best.average} / 20`}
          type="purple"
        />

        <KpiCard
          icon="⚠"
          title={t.worstStudent}
          value={analyse.result.students.worst.studentName}
          subValue={`${analyse.result.students.worst.average} / 20`}
          type="orange"
        />
      </section>

      {/* ======================================================
          BEST / WORST SUBJECT
      ====================================================== */}

      <section className="best-worst-grid">
        <div className="subject-highlight best">
          <div className="highlight-icon">🏆</div>

          <div>
            <span>{t.bestSubject}</span>
            <strong>
              {analyse.result.bestSubject.name.replace(
                `ف ${analyse.trimester}`,
                "",
              )}
            </strong>
            <small>{analyse.result.bestSubject.average} / 20</small>
          </div>
        </div>

        <div className="subject-highlight worst">
          <div className="highlight-icon">⚠</div>

          <div>
            <span>{t.worstSubject}</span>
            <strong>
              {analyse.result.worstSubject.name.replace(
                `ف ${analyse.trimester}`,
                "",
              )}
            </strong>
            <small>{analyse.result.worstSubject.average} / 20</small>
          </div>
        </div>
      </section>

      {/* ======================================================
          SUBJECT STATISTICS
      ====================================================== */}

      <section className="section-card">
        <SectionTitle icon="▥" title={t.subjectStatistics} />

        <div className="table-wrapper pdf-scroll-table">
          <table className="subject-table">
            <thead>
              <tr>
                <th rowSpan="2">#</th>

                <th rowSpan="2">{t.subject}</th>

                <th rowSpan="2">{t.average}</th>

                <th colSpan="7"> {t.gradeDistribution}</th>

                <th colSpan="2"> {t.successFailure}</th>

                <th colSpan="3">{t.studentsAbove10}</th>

                <th colSpan="3"> {t.studentsbelow10}</th>

                <th colSpan="3"> {t.repeatersAbove10}</th>
              </tr>

              <tr>
                <th>0-5.99</th>
                <th>6-9.99</th>
                <th>10-11.99</th>
                <th>12-13.99</th>
                <th>14-15.99</th>
                <th>16-17.99</th>
                <th>18-20</th>

                <th className="success-column">{t.success}</th>

                <th className="failure-column">{t.failure}</th>

                <th>{t.female}</th>
                <th>{t.male}</th>
                <th>{t.total}</th>

                <th>{t.female}</th>
                <th>{t.male}</th>
                <th>{t.total}</th>

                <th>{t.female}</th>
                <th>{t.male}</th>
                <th>{t.total}</th>
              </tr>
            </thead>

            <tbody>
              {analyse.result.subjects.map((subject, index) => (
                <tr key={subject.name}>
                  <td>{index + 1}</td>

                  <td className="subject-name">
                    {subject.replace(`ف ${analyse.trimester}`, "")}
                  </td>

                  <td className="average-cell">
                    {analyse.result.statistics[subject].average}
                  </td>

                  <td>
                    {analyse.result.statistics[subject].distribution["0-5.99"]}
                  </td>

                  <td>
                    {analyse.result.statistics[subject].distribution["6-9.99"]}
                  </td>

                  <td>
                    {
                      analyse.result.statistics[subject].distribution[
                        "10-11.99"
                      ]
                    }
                  </td>

                  <td>
                    {
                      analyse.result.statistics[subject].distribution[
                        "12-13.99"
                      ]
                    }
                  </td>

                  <td>
                    {
                      analyse.result.statistics[subject].distribution[
                        "14-15.99"
                      ]
                    }
                  </td>

                  <td>
                    {
                      analyse.result.statistics[subject].distribution[
                        "16-17.99"
                      ]
                    }
                  </td>

                  <td>
                    {analyse.result.statistics[subject].distribution["18-20"]}
                  </td>

                  <td className="success-text">
                    {analyse.result.statistics[subject].successRate.toFixed(2)}%
                  </td>

                  <td className="failure-text">
                    {analyse.result.statistics[subject].failureRate.toFixed(2)}%
                  </td>

                  <td>{analyse.result.statistics[subject].femaleAbove10}</td>

                  <td>{analyse.result.statistics[subject].maleAbove10}</td>

                  <td>{analyse.result.statistics[subject].totalAbove10}</td>

                  <td>{analyse.result.statistics[subject].femaleBelow10}</td>

                  <td>{analyse.result.statistics[subject].maleBelow10}</td>

                  <td>{analyse.result.statistics[subject].totalBelow10}</td>

                  <td>
                    {analyse.result.statistics[subject].totalDoubledAbove10}
                  </td>

                  <td>
                    {analyse.result.statistics[subject].totalDoubledBelow10}
                  </td>

                  <td>
                    {analyse.result.statistics[subject].totalDoubledAbove10 +
                      analyse.result.statistics[subject].totalDoubledBelow10}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ======================================================
          STUDENT RANKING + PIE CHART + ADDITIONAL INFORMATION
      ====================================================== */}

      <section className="middle-grid">
        {/* ================= STUDENT RANKING ================= */}

        <div className="section-card ranking-card ">
          <SectionTitle icon="🏆" title={t.studentRanking} />

          <div className="ranking-container pdf-scroll-table">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>{t.rank}</th>
                  <th>{t.studentName} </th>
                  <th>{t.average}</th>
                </tr>
              </thead>

              <tbody>
                {analyse.result.students.ranking.map((student) => (
                  <tr key={student.rank}>
                    <td>
                      <span className={`rank-number rank-${student.rank}`}>
                        {student.rank}
                      </span>
                    </td>

                    <td>{student.studentName}</td>

                    <td className="ranking-average">{student.average}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= PIE CHART ================= */}
        <div className="distribution-card">
          {/* Header */}
          <div className="distribution-header">
            <div className="distribution-icon">📊</div>

            <div>
              <h3> {t.trimesterAverageStudentDistribution}</h3>
            </div>
          </div>

          {/* Chart */}
          <div className="distribution-chart">
            {/* Y Axis */}
            <div className="y-axis">
              {yAxisValues.map((value, index) => (
                <span key={index}>{formatNumber(value)}</span>
              ))}
            </div>

            {/* Main chart area */}
            <div className="chart-area">
              {/* Grid lines */}
              <div className="chart-grid">
                {yAxisValues.map((_, index) => (
                  <span key={index}></span>
                ))}
              </div>

              {/* Bars */}
              <div className="bars-container">
                {Object.entries(distribution).map(([range, value]) => {
                  const count = Number(value) || 0;

                  /*
                  Calculate bar height relative to maxValue.

                  Example:
                  count = 6
                  maxValue = 12
                  height = 50%
                */
                  const barHeight = maxValue > 0 ? (count / maxValue) * 100 : 0;

                  return (
                    <div className="bar-item" key={range}>
                      {/* Value above the bar */}
                      <strong
                        className="bar-value"
                        style={{
                          bottom: `${barHeight}%`,
                        }}
                      >
                        {count}
                      </strong>

                      {/* Bar */}
                      <div
                        className="bar"
                        style={{
                          height: `${barHeight}%`,
                        }}
                      ></div>

                      {/* X-axis label */}
                      <span className="bar-label">{range}</span>
                    </div>
                  );
                })}
              </div>

              {/* X Axis */}
              <div className="x-axis"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          TRIMESTER COMPARISON
      ====================================================== */}

      {analyse.result.comparison && (
        <section className="section-card comparison-section pdf-scroll-table">
          <SectionTitle icon="↔" title={t.trimesterAverageComparison} />

          <div className="comparison-grid">
            {Object.entries(analyse.result.comparison).map(
              ([key, trimester]) => {
                const number = key.replace("trimester", "");

                return (
                  <div
                    className={`trimester-card trimester-${number}`}
                    key={key}
                  >
                    <div className="trimester-header">
                      <strong>
                        {t.trimester} {number}
                      </strong>

                      <span>T{number}</span>
                    </div>

                    <div className="trimester-summary">
                      <div>
                        <span> {t.trimesterAverage}</span>
                        <strong>{trimester.average}</strong>
                      </div>

                      <div className="centerSuccess">
                        <span>{t.successfulStudentsCount}</span>
                        <strong>{trimester.successCount}</strong>
                      </div>

                      <div>
                        <span>{t.failedStudentsCount} </span>
                        <strong>{trimester.failureCount}</strong>
                      </div>
                    </div>

                    <div className="comparison-table-wrapper pdf-scroll-table">
                      <table className="comparison-table">
                        <thead>
                          <tr>
                            <th>{t.subject}</th>
                            <th>{t.average}</th>
                          </tr>
                        </thead>

                        <tbody>
                          {Object.entries(trimester.subjects).map(
                            ([subject, average]) => (
                              <tr key={subject}>
                                <td>{subject.replace(`ف ${number}`, "")}</td>

                                <td>{average}</td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </section>
      )}
    </div>
  );
};

/* ============================================================
   REUSABLE COMPONENTS
   ============================================================ */

const InfoItem = ({ icon, title, value }) => {
  return (
    <div className="info-item">
      <div className="info-icon">{icon}</div>

      <div>
        <span>{title}</span>

        <strong>{value}</strong>
      </div>
    </div>
  );
};

const KpiCard = ({ icon, title, value, subValue, type }) => {
  return (
    <div className={`kpi-card ${type}`}>
      <div className="kpi-icon">{icon}</div>

      <div className="kpi-content">
        <span>{title}</span>

        <strong>{value}</strong>

        {subValue && <small>{subValue}</small>}
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }) => {
  return (
    <div className="section-title">
      <div className="section-title-icon">{icon}</div>

      <h2>{title}</h2>
    </div>
  );
  // !==================================================================
};

export default Analyses;
