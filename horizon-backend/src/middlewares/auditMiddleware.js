const { logAction } = require("../services/auditService");

exports.audit = (action, entity) => {
  return (req, res, next) => {
    const onFinish = () => {
      res.removeListener("finish", onFinish);

      if (res.statusCode >= 400) {
        return;
      }

      const userId = req.user?.id || req.user?.user_id || null;
      if (!userId) {
        return;
      }

      const entityId =
        req.params?.id ||
        req.params?.userId ||
        req.params?.studentId ||
        req.params?.classId ||
        req.params?.courseId ||
        null;

      const details = {
        method: req.method,
        route: req.originalUrl || req.url,
        ip: req.ip || req.connection?.remoteAddress || null,
      };

      logAction({
        user_id: userId,
        action,
        entity,
        entity_id: entityId,
        details,
      });
    };

    res.on("finish", onFinish);
    next();
  };
};
