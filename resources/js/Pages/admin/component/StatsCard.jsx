// src/components/StatsCard.js

import React from "react";

import PropTypes from "prop-types";

function StatsCard({ title, value, icon }) {
    return (
        <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center">
                <div className="mr-4 text-blue-400">{icon}</div>
                <div>
                    <h3 className="text-sm tracking-wide text-gray-300 uppercase">
                        {title}
                    </h3>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node.isRequired,
};

export default StatsCard;
