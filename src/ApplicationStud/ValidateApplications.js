export default function ValidateApplications(data) {
  return (
    ((data.level_of_study === "TARUMT Relavant Diploma" ||
      data.level_of_study === "IHL Diploma") &&
      data.cpga >= 2.5) ||
    data.level_of_study === "STPM" ||
    data.level_of_study === "A-Level" ||
    data.level_of_study === "UEC" ||
    data.level_of_study === "IHL Foundation" ||
    data.level_of_study === "TARUMT Foundation In Computing Track A"
  );
}
